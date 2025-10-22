import React, { useState } from 'react';
import { translations, Language } from '../constants';
import ChatView from './ChatView';
import ImageEditorView from './ImageEditorView';
import VideoGeneratorView from './VideoGeneratorView';
import LiveAudioView from './LiveAudioView';
import ToolsView from './ToolsView';

interface ChatInterfaceProps {
    language: Language;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    onChangeLanguage: (lang: Language) => void;
}

type Mode = 'chat' | 'image' | 'video' | 'live' | 'tools';

const ChatInterface: React.FC<ChatInterfaceProps> = (props) => {
    const { language, isDarkMode, onToggleDarkMode, onChangeLanguage } = props;
    const [mode, setMode] = useState<Mode>('chat');
    const t = translations[language];

    const ModeButton: React.FC<{
        label: string;
        currentMode: Mode;
        targetMode: Mode;
        onClick: (mode: Mode) => void;
    }> = ({ label, currentMode, targetMode, onClick }) => {
        const isActive = currentMode === targetMode;
        return (
            <button
                onClick={() => onClick(targetMode)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                    isActive
                        ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <header className="flex justify-center items-center mb-6">
                    <div className="text-center">
                         <div className="flex items-center justify-center mb-2">
                            <div className="w-20 h-20 rounded-full bg-sena-gradient flex items-center justify-center sena-avatar shadow-xl">
                                <img src="https://i.imgur.com/Z4o5s3e.png" alt="Logo Sena" className="w-16 h-16 object-contain" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold">
                            <span className="bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">SENA</span>
                        </h1>
                    </div>
                </header>

                {/* Main Container */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-colors flex flex-col h-[75vh]">
                    <div className="flex border-b border-gray-200 dark:border-gray-700 shrink-0">
                        <ModeButton label={t.chatMode} currentMode={mode} targetMode="chat" onClick={setMode} />
                        <ModeButton label={t.imageMode} currentMode={mode} targetMode="image" onClick={setMode} />
                        <ModeButton label={t.videoMode} currentMode={mode} targetMode="video" onClick={setMode} />
                        <ModeButton label={t.liveMode} currentMode={mode} targetMode="live" onClick={setMode} />
                        <ModeButton label={t.toolsMode} currentMode={mode} targetMode="tools" onClick={setMode} />
                    </div>

                    <div className="flex-grow relative overflow-y-auto">
                        {mode === 'chat' && <ChatView language={language} />}
                        {mode === 'image' && <ImageEditorView language={language} />}
                        {mode === 'video' && <VideoGeneratorView language={language} />}
                        {mode === 'live' && <LiveAudioView language={language} />}
                        {mode === 'tools' && (
                            <ToolsView
                                language={language}
                                isDarkMode={isDarkMode}
                                onToggleDarkMode={onToggleDarkMode}
                                onChangeLanguage={onChangeLanguage}
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center mt-6 space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.footerTagline}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        {t.footerDisclaimer} | <a href="https://termos.orpheostudio.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 dark:hover:text-purple-400">Termos de Uso</a> | <a href="https://politicas.orpheostudio.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 dark:hover:text-purple-400">Privacidade</a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default ChatInterface;