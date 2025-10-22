import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations, Language } from '../constants';

declare var QRCode: any;

// Helper components for icons
const BugIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

interface ToolsViewProps {
    language: Language;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    onChangeLanguage: (lang: Language) => void;
}

const ToolCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-purple-50 dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700/50">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div>{children}</div>
    </div>
);

const QRCodeGenerator: React.FC<{ t: any }> = ({ t }) => {
    const [text, setText] = useState('https://orpheostudio.com.br');
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const generate = useCallback(() => {
        if (qrCodeRef.current) {
            qrCodeRef.current.innerHTML = '';
            new QRCode(qrCodeRef.current, {
                text: text,
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }, [text]);

    useEffect(() => {
        generate();
    }, [generate]);

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-grow w-full">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t.qrCodeInputPlaceholder}
                    className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 transition-all shadow-sm"
                />
            </div>
            <div ref={qrCodeRef} className="p-2 bg-white rounded-lg shadow-md"></div>
        </div>
    );
};

const PasswordGenerator: React.FC<{ t: any }> = ({ t }) => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copyText, setCopyText] = useState('Copiar');

    const generatePassword = useCallback(() => {
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        let charset = lower + upper;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;

        let newPassword = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            newPassword += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(newPassword);
        setCopyText('Copiar');
    }, [length, includeNumbers, includeSymbols]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopyText(t.passwordCopied);
    };

    return (
        <div>
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-xl px-4 py-2 mb-4 shadow-sm">
                <input
                    type="text"
                    value={password}
                    readOnly
                    className="flex-grow bg-transparent text-gray-900 dark:text-white font-mono focus:outline-none"
                />
                <button onClick={copyToClipboard} className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">{copyText}</button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <label htmlFor="length">{t.passwordLength}</label>
                    <input id="length" type="number" value={length} onChange={e => setLength(parseInt(e.target.value, 10))} className="w-16 bg-white dark:bg-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                    {t.passwordIncludeNumbers}
                </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                    {t.passwordIncludeSymbols}
                </label>
            </div>
            <button onClick={generatePassword} className="mt-4 w-full bg-sena-gradient text-white font-semibold py-2 rounded-xl transition-opacity hover:opacity-90">
                {t.passwordGenerateButton}
            </button>
        </div>
    );
};

const AppSettings: React.FC<{
    t: any;
    language: Language;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    onChangeLanguage: (lang: Language) => void;
}> = ({ t, language, isDarkMode, onToggleDarkMode, onChangeLanguage }) => {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    return (
        <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.darkModeLabel}</span>
                <button
                    onClick={onToggleDarkMode}
                    className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                    aria-label="Toggle dark mode"
                >
                    <span className={`${isDarkMode ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'} absolute w-full h-full rounded-full transition-colors`}></span>
                    <span className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}></span>
                </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.languageLabel}</span>
                <div className="relative">
                    <button
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <span className="text-lg">{ {pt: '🇧🇷', en: '🇺🇸', es: '🇪🇸'}[language] }</span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{ {pt: 'Português', en: 'English', es: 'Español'}[language] }</span>
                    </button>
                    {showLanguageMenu && (
                        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-2 z-10 w-40 border dark:border-gray-700">
                            <button onClick={() => { onChangeLanguage('pt'); setShowLanguageMenu(false); }} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="text-xl">🇧🇷</span><span className="text-sm text-gray-700 dark:text-gray-300">Português</span></button>
                            <button onClick={() => { onChangeLanguage('en'); setShowLanguageMenu(false); }} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="text-xl">🇺🇸</span><span className="text-sm text-gray-700 dark:text-gray-300">English</span></button>
                            <button onClick={() => { onChangeLanguage('es'); setShowLanguageMenu(false); }} className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="text-xl">🇪🇸</span><span className="text-sm text-gray-700 dark:text-gray-300">Español</span></button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bug Report */}
            <a
                href="mailto:sac.studiotsukiyo@outlook.com?subject=Bug Report - SENA"
                className="w-full flex items-center justify-center gap-2 text-center bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-xl transition-colors"
            >
                <BugIcon />
                {t.reportBugLabel}
            </a>
        </div>
    );
};


const ToolsView: React.FC<ToolsViewProps> = ({ language, isDarkMode, onToggleDarkMode, onChangeLanguage }) => {
    const t = translations[language];

    return (
        <div className="p-6 space-y-6 h-full overflow-y-auto">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t.toolsTitle}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{t.toolsDescription}</p>
            </div>

            <ToolCard title={t.qrCodeGeneratorTitle} description={t.qrCodeGeneratorDescription}>
                <QRCodeGenerator t={t} />
            </ToolCard>

            <ToolCard title={t.passwordGeneratorTitle} description={t.passwordGeneratorDescription}>
                <PasswordGenerator t={t} />
            </ToolCard>
            
            <ToolCard title={t.appSettingsTitle} description={t.appSettingsDescription}>
                <AppSettings 
                    t={t}
                    language={language}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={onToggleDarkMode}
                    onChangeLanguage={onChangeLanguage}
                />
            </ToolCard>
        </div>
    );
};

export default ToolsView;