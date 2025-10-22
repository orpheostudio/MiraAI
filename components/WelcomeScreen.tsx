import React, { useState } from 'react';
import { translations, Language } from '../constants';

interface WelcomeScreenProps {
  language: Language;
  onStartChat: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ language, onStartChat }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const t = translations[language];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-colors">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-sena-gradient flex items-center justify-center sena-avatar shadow-2xl">
              <img src="https://i.imgur.com/Z4o5s3e.png" alt="Logo Sena" className="w-24 h-24 object-contain" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-3">
            <span className="bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">SENA</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">{t.welcomeTagline}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t.welcomeDescription}</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3" dangerouslySetInnerHTML={{ __html: t.welcomeFeaturesTitle }} />
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {t.welcomeFeaturesList.map((item: string, index: number) => <li key={index}>{item}</li>)}
          </ul>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 mb-6">
          <p className="text-sm text-yellow-800 dark:text-yellow-200" dangerouslySetInnerHTML={{ __html: t.welcomeDisclaimer }} />
        </div>
        
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mt-1 w-5 h-5 text-purple-500 rounded focus:ring-2 focus:ring-purple-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t.welcomeTerms }} />
          </label>
        </div>
        
        <button 
          onClick={onStartChat} 
          disabled={!termsAccepted}
          className="w-full bg-sena-gradient hover:opacity-90 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg">
          {t.startButton}
        </button>
        
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            Desenvolvido por <strong>Orpheo Studio</strong>
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;