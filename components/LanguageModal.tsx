
import React from 'react';
import type { Language } from '../constants';

interface LanguageModalProps {
  onSelectLanguage: (language: Language) => void;
}

const LanguageButton: React.FC<{
  lang: Language;
  flag: string;
  name: string;
  region: string;
  onClick: (lang: Language) => void;
  className?: string;
}> = ({ lang, flag, name, region, onClick, className }) => (
  <button
    onClick={() => onClick(lang)}
    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${className}`}
  >
    <span className="text-3xl">{flag}</span>
    <div className="text-left">
      <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{region}</div>
    </div>
  </button>
);

const LanguageModal: React.FC<LanguageModalProps> = ({ onSelectLanguage }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">🌍 Escolha seu idioma</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Select your language | Seleccione su idioma</p>
        
        <div className="space-y-3">
          <LanguageButton 
            lang="pt" 
            flag="🇧🇷" 
            name="Português" 
            region="Brasil" 
            onClick={onSelectLanguage}
            className="bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50"
          />
          <LanguageButton 
            lang="en" 
            flag="🇺🇸" 
            name="English" 
            region="United States" 
            onClick={onSelectLanguage}
            className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          />
          <LanguageButton 
            lang="es" 
            flag="🇪🇸" 
            name="Español" 
            region="España" 
            onClick={onSelectLanguage}
            className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
