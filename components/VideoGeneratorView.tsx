import React, { useState, useCallback, useRef, useEffect } from 'react';
import { translations, Language } from '../constants';
import { generateVideo } from '../services/geminiService';
import { fileToBase64 } from '../utils';

interface VideoGeneratorViewProps {
    language: Language;
}

const VideoGeneratorView: React.FC<VideoGeneratorViewProps> = ({ language }) => {
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [generatedVideo, setGeneratedValue] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [apiKeySelected, setApiKeySelected] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = translations[language];

    const checkApiKey = async () => {
        if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
            setApiKeySelected(true);
        } else {
            setApiKeySelected(false);
        }
    };
    
    useEffect(() => {
        checkApiKey();
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSourceFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSourceImage(reader.result as string);
                setGeneratedValue(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!sourceFile || !prompt) return;
        
        setStatus(t.generatingVideoStatus);
        setError(null);
        setGeneratedValue(null);

        try {
            const { mimeType, data } = await fileToBase64(sourceFile);
            const generator = generateVideo(data, mimeType, prompt, aspectRatio);

            for await (const result of generator) {
                if (typeof result === 'object' && result.videoUrl) {
                    setGeneratedValue(result.videoUrl);
                    setStatus(null);
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(t.videoError + ` (${errorMessage})`);
            if (errorMessage.includes("API key error")) {
                setApiKeySelected(false); // Force re-selection
            }
            setStatus(null);
        }
    }, [sourceFile, prompt, aspectRatio, t]);
    
    const handleSelectKey = async () => {
        await window.aistudio.openSelectKey();
        await checkApiKey();
    };

    if (!apiKeySelected) {
        return (
            <div className="flex flex-col h-full items-center justify-center p-6 text-center">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t.videoGeneratorTitle}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t.selectApiKeyPrompt}</p>
                <button onClick={handleSelectKey} className="bg-sena-gradient text-white font-semibold py-2 px-6 rounded-lg mb-4">
                    {t.selectKeyButton}
                </button>
                <p className="text-xs text-gray-500">
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline">
                        {t.billingInfoLink}
                    </a>
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">{t.videoGeneratorTitle}</h2>
            <div className="flex-grow flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                {status ? (
                    <div className="text-center text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 mx-auto border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4">{status}</p>
                    </div>
                ) : generatedVideo ? (
                    <video src={generatedVideo} controls autoPlay loop className="max-h-full max-w-full rounded-lg" />
                ) : sourceImage ? (
                    <img src={sourceImage} alt="Source" className="max-h-full max-w-full object-contain rounded-lg cursor-pointer" onClick={() => fileInputRef.current?.click()} />
                ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="text-center text-gray-500 dark:text-gray-400">
                        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <p className="mt-2">{t.uploadImagePrompt}</p>
                    </button>
                )}
            </div>

            {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
            
            <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t.videoPromptPlaceholder}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 shadow-sm"
                        disabled={!sourceImage || !!status}
                    />
                    <button onClick={handleGenerate} disabled={!sourceImage || !prompt || !!status} className="bg-sena-gradient hover:opacity-90 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-2xl px-6 py-3 shadow-lg font-semibold">
                        {t.generateButton}
                    </button>
                </div>
                <div className="flex items-center gap-4 self-center">
                    <label className="text-sm text-gray-600 dark:text-gray-300">{t.aspectRatio}:</label>
                    <div className="flex gap-2">
                        <button onClick={() => setAspectRatio('16:9')} className={`px-3 py-1 rounded-lg text-sm ${aspectRatio === '16:9' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>16:9</button>
                        <button onClick={() => setAspectRatio('9:16')} className={`px-3 py-1 rounded-lg text-sm ${aspectRatio === '9:16' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>9:16</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGeneratorView;
