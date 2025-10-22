import React, { useState, useCallback, useRef } from 'react';
import { translations, Language } from '../constants';
import { editImage } from '../services/geminiService';
import { fileToBase64 } from '../utils';

interface ImageEditorViewProps {
    language: Language;
}

const ImageEditorView: React.FC<ImageEditorViewProps> = ({ language }) => {
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = translations[language];

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSourceFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSourceImage(reader.result as string);
                setEditedImage(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = useCallback(async () => {
        if (!sourceFile || !prompt) return;
        
        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        try {
            const { mimeType, data } = await fileToBase64(sourceFile);
            const resultBase64 = await editImage(data, mimeType, prompt);
            setEditedImage(`data:image/png;base64,${resultBase64}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [sourceFile, prompt]);

    return (
        <div className="flex flex-col h-full p-6">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">{t.imageEditorTitle}</h2>
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                {/* Source Image */}
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    {sourceImage ? (
                        <img src={sourceImage} alt="Source" className="max-h-full max-w-full object-contain rounded-lg cursor-pointer" onClick={() => fileInputRef.current?.click()} />
                    ) : (
                        <button onClick={() => fileInputRef.current?.click()} className="text-center text-gray-500 dark:text-gray-400">
                            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <p className="mt-2">{t.uploadImagePrompt}</p>
                        </button>
                    )}
                </div>

                {/* Edited Image */}
                <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                    {isLoading ? (
                         <div className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300">
                             <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                             <span>{t.generating}</span>
                         </div>
                    ) : editedImage ? (
                        <img src={editedImage} alt="Edited" className="max-h-full max-w-full object-contain rounded-lg" />
                    ) : (
                         <div className="text-center text-gray-500 dark:text-gray-400">
                            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.707.707M12 21v-1"></path></svg>
                             <p className="mt-2">Seu resultado aparecerá aqui.</p>
                         </div>
                    )}
                </div>
            </div>
            
            {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t.editPromptPlaceholder}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 transition-all shadow-sm"
                    disabled={!sourceImage || isLoading}
                />
                <button onClick={handleGenerate} disabled={!sourceImage || !prompt || isLoading} className="bg-sena-gradient hover:opacity-90 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-2xl px-6 py-3 transition-all shadow-lg font-semibold">
                    {t.generateButton}
                </button>
            </div>
        </div>
    );
};

export default ImageEditorView;
