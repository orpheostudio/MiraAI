import React, { useState } from 'react';
import { translations, Language } from '../constants';
import type { FeatureMode } from '../types';
import ChatView from './ChatView';
import ImageEditorView from './ImageEditorView';
import VideoGeneratorView from './VideoGeneratorView';
import LiveAudioView from './LiveAudioView';

// Helper components for icons
const DarkModeIcon = () => <svg className="w-6 h-6 text-gray-700 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const BugIcon = () => <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const LiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M8.464 15.536a5 5 0 010-7.072" /></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

interface ChatInterfaceProps {
    language: Language;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    onChangeLanguage: (lang: Language) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = (props) => {
    const { language, onToggleDarkMode, onChangeLanguage } = props;
    const [mode, setMode] = useState<FeatureMode>('chat');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const t = translations[language];

    const renderView = () => {
        switch (mode) {
            case 'chat': return <ChatView {...props} />;
            case 'live': return <LiveAudioView language={language} />;
            case 'image': return <ImageEditorView language={language} />;
            case 'video': return <VideoGeneratorView language={language} />;
            default: return <ChatView {...props} />;
        }
    };
    
    const ModeButton: React.FC<{
        currentMode: FeatureMode,
        targetMode: FeatureMode,
        label: string,
        icon: React.ReactNode
    }> = ({ currentMode, targetMode, label, icon }) => (
        <button
            onClick={() => setMode(targetMode)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg w-20 transition-colors ${
                currentMode === targetMode 
                ? 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <header className="flex justify-between items-center mb-6 relative">
                    <div className="text-center flex-1">
                         <div className="flex items-center justify-center mb-2">
                            <div className="w-20 h-20 rounded-full bg-sena-gradient flex items-center justify-center sena-avatar shadow-xl">
                                <img src="https://i.imgur.com/5watJQF.png" alt="Logo Sena" className="w-16 h-16 object-contain" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold">
                            <span className="bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">SENA</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">{t.headerTagline}</p>
                    </div>
                    {/* Controls */}
                    <div className="absolute top-0 right-0 flex gap-2">
                         <div className="relative">
                            <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all" title="Mudar idioma">
                                <span className="text-2xl">{ {pt: '🇧🇷', en: '🇺🇸', es: '🇪🇸'}[language] }</span>
                            </button>
                            {showLanguageMenu && (
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 z-10 min-w-[150px]">
                                    <button onClick={() => { onChangeLanguage('pt'); setShowLanguageMenu(false); }} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="text-xl">🇧🇷</span><span className="text-sm text-gray-700 dark:text-gray-300">Português</span></button>
                                    <button onClick={() => { onChangeLanguage('en'); setShowLanguageMenu(false); }} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="text-xl">🇺🇸</span><span className="text-sm text-gray-700 dark:text-gray-300">English</span></button>
                                    <button onClick={() => { onChangeLanguage('es'); setShowLanguageMenu(false); }} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="text-xl">🇪🇸</span><span className="text-sm text-gray-700 dark:text-gray-300">Español</span></button>
                                </div>
                            )}
                        </div>
                        <button onClick={onToggleDarkMode} className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all" title="Alternar modo escuro"><DarkModeIcon /></button>
                        <a href="mailto:sac.studiotsukiyo@outlook.com?subject=Bug Report - SENA" className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all" title="Reportar bug"><BugIcon /></a>
                    </div>
                </header>

                {/* Main Container */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-colors flex flex-col h-[75vh]">
                    {renderView()}

                    {/* Mode Switcher */}
                     <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800/50 flex justify-around">
                        <ModeButton currentMode={mode} targetMode='chat' label={t.chatMode} icon={<ChatIcon />} />
                        <ModeButton currentMode={mode} targetMode='live' label={t.liveMode} icon={<LiveIcon />} />
                        <ModeButton currentMode={mode} targetMode='image' label={t.imageMode} icon={<ImageIcon />} />
                        <ModeButton currentMode={mode} targetMode='video' label={t.videoMode} icon={<VideoIcon />} />
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
