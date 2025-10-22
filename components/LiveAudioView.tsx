import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob as GenAIFile } from "@google/genai";
import { translations, Language } from '../constants';
import { encode, decode, decodeAudioData } from '../utils';

interface LiveAudioViewProps {
    language: Language;
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

const LiveAudioView: React.FC<LiveAudioViewProps> = ({ language }) => {
    const [status, setStatus] = useState<ConnectionStatus>('disconnected');
    const t = translations[language];

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    
    const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
    const nextStartTimeRef = useRef(0);

    const getAi = () => {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API key not configured.");
      return new GoogleGenAI({ apiKey });
    }

    const stopAudioProcessing = useCallback(() => {
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            inputAudioContextRef.current.close().catch(console.error);
            inputAudioContextRef.current = null;
        }
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            sourcesRef.current.forEach(source => source.stop());
            sourcesRef.current.clear();
            outputAudioContextRef.current.close().catch(console.error);
            outputAudioContextRef.current = null;
        }
    }, []);

    const disconnect = useCallback(async () => {
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (error) {
                console.error("Error closing session:", error);
            } finally {
                sessionPromiseRef.current = null;
            }
        }
        stopAudioProcessing();
        setStatus('disconnected');
    }, [stopAudioProcessing]);

    const connect = useCallback(async () => {
        if (status !== 'disconnected' && status !== 'error') return;
        setStatus('connecting');

        try {
            const ai = getAi();
            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                },
                callbacks: {
                    onopen: async () => {
                        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                        outputAudioContextRef.current = new AudioContext({ sampleRate: 24000 });
                        inputAudioContextRef.current = new AudioContext({ sampleRate: 16000 });
                        nextStartTimeRef.current = 0;
                        
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        mediaStreamRef.current = stream;

                        if (!inputAudioContextRef.current) return;
                        
                        mediaStreamSourceRef.current = inputAudioContextRef.current.createMediaStreamSource(stream);
                        scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);

                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }
                            const pcmBlob: GenAIFile = {
                                data: encode(new Uint8Array(int16.buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            
                            if (sessionPromiseRef.current) {
                                sessionPromiseRef.current.then((session) => {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                });
                            }
                        };
                        mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);
                        setStatus('connected');
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        const outputContext = outputAudioContextRef.current;

                        if (base64Audio && outputContext) {
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContext.currentTime);
                            
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputContext, 24000, 1);
                            
                            const source = outputContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputContext.destination);
                            source.addEventListener('ended', () => sourcesRef.current.delete(source));
                            
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }
                        if (message.serverContent?.interrupted) {
                            sourcesRef.current.forEach(source => source.stop());
                            sourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live API Error:', e);
                        setStatus('error');
                        disconnect();
                    },
                    onclose: () => {
                        stopAudioProcessing();
                        if (status !== 'error') {
                           setStatus('disconnected');
                        }
                    },
                }
            });
            await sessionPromiseRef.current;
        } catch (error) {
            console.error('Failed to connect:', error);
            setStatus('error');
            await disconnect();
        }
    }, [disconnect, status, stopAudioProcessing]);
    
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);
    
    const getStatusText = () => {
        switch(status) {
            case 'connected': return t.statusConnected;
            case 'connecting': return t.statusConnecting;
            case 'disconnected': return t.statusDisconnected;
            case 'error': return t.statusError;
        }
    };
    
    return (
        <div className="flex flex-col h-full items-center justify-center p-6 text-center">
             <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.liveAudioTitle}</h2>
             <div className="w-40 h-40 rounded-full bg-sena-gradient flex items-center justify-center sena-avatar shadow-2xl mb-6">
                <div className={`w-32 h-32 rounded-full bg-white/30 flex items-center justify-center transition-all ${status === 'connected' ? 'sena-avatar listening' : ''}`}>
                    <img src="https://i.imgur.com/5watJQF.png" alt="Logo Sena" className="w-24 h-24 object-contain" />
                </div>
             </div>
             <p className={`mb-6 font-semibold ${status === 'error' ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>{getStatusText()}</p>
             <button
                onClick={status === 'connected' || status === 'connecting' ? disconnect : connect}
                disabled={status === 'connecting'}
                className="bg-sena-gradient hover:opacity-90 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-wait text-white font-semibold py-3 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
             >
                {status === 'connected' || status === 'connecting' ? t.disconnect : t.connect}
             </button>
        </div>
    );
};

export default LiveAudioView;
