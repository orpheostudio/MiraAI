import React, { useState, useEffect, useRef, useCallback } from 'react';
import { streamMessage, initializeChat } from '../services/geminiService';
import { translations, Language } from '../constants';
import type { Message } from '../types';

// Speech recognition types (from original ChatInterface)
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}
interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

// Icon Components
const MicIcon = () => <svg className="w-5 h-5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>;
const SendIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>;

interface ChatViewProps {
    language: Language;
}

const ChatView: React.FC<ChatViewProps> = ({ language }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const t = translations[language];
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current.scrollHeight, behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    useEffect(() => {
        initializeChat(language);
        setMessages([{ role: 'assistant', content: t.greeting }]);
        setShowSuggestions(true);
    }, [language, t.greeting]);

    const handleSendMessage = useCallback(async (messageText: string) => {
        const text = messageText.trim();
        if (!text || isLoading) return;

        setShowSuggestions(false);
        setInputMessage('');

        const newUserMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, newUserMessage, { role: 'assistant', content: '' }]);
        setIsLoading(true);
        
        try {
            const stream = await streamMessage(text, messages, language);
            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'assistant', content: fullResponse };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error(error);
             setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'assistant', content: t.errorResponse };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, language, messages, t.errorResponse]);
    
    const handleSelectSuggestion = (suggestion: string) => handleSendMessage(suggestion);
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage(inputMessage);
        }
    };
    
    const startVoiceInput = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            return;
        }
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Your browser does not support voice recognition.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        const langs: Record<Language, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
        recognition.lang = langs[language];
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => setIsRecording(false);
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsRecording(false);
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleSendMessage(transcript);
        };
        
        recognition.start();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <div ref={messagesContainerRef} className="flex-grow overflow-y-auto p-6 space-y-4 scroll-smooth">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex chat-message ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                            msg.role === 'user' ? 'bg-sena-gradient text-white' : 'chat-bubble-bot text-gray-900 dark:text-white'
                        }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.content || '...' }}></p>
                        </div>
                    </div>
                ))}
                {showSuggestions && (
                     <div className="space-y-2 mt-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">Sugestões:</p>
                        {t.suggestions.map((s: string, i: number) => (
                            <button key={i} onClick={() => handleSelectSuggestion(s)} className="w-full text-left bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-200 text-sm rounded-xl px-4 py-3 transition-colors">
                                {s}
                            </button>
                        ))}
                    </div>
                )}
                {isLoading && messages[messages.length-1]?.role === 'assistant' && messages[messages.length-1]?.content === '' && (
                    <div className="flex justify-start chat-message">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-5 py-3">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full pulse-dot bg-gradient-to-b from-cyan-400 to-purple-600"></div>
                                <div className="w-2 h-2 rounded-full pulse-dot bg-gradient-to-b from-blue-400 to-purple-600" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 rounded-full pulse-dot bg-gradient-to-b from-purple-400 to-purple-600" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 transition-colors">
                <div className="flex gap-2 items-end">
                     <button onClick={startVoiceInput} className={`p-3 rounded-2xl transition-all shadow-sm ${isRecording ? 'bg-purple-500 text-white animate-pulse' : 'bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-900/50'}`} title="Falar com Sena">
                        <MicIcon />
                    </button>
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.inputPlaceholder}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 transition-all shadow-sm"
                        disabled={isLoading}
                    />
                    <button onClick={() => handleSendMessage(inputMessage)} disabled={!inputMessage.trim() || isLoading} className="bg-sena-gradient hover:opacity-90 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-2xl p-3 transition-all shadow-lg">
                        <SendIcon />
                    </button>
                </div>
                {isRecording && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-600 rounded voice-wave" style={{ animationDelay: '0s' }}></div>
                            <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-600 rounded voice-wave" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-600 rounded voice-wave" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm ml-2 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent font-medium">{t.listeningText}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatView;
