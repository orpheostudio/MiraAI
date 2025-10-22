
import React, { useState, useEffect, useCallback } from 'react';
import { Language, translations } from './constants';
import LanguageModal from './components/LanguageModal';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';

type Screen = 'language' | 'welcome' | 'chat';

function App() {
  const [screen, setScreen] = useState<Screen>('language');
  const [language, setLanguage] = useState<Language>('pt');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    const langPreference = localStorage.getItem('language');

    if (darkModePreference === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    if (langPreference && (langPreference === 'pt' || langPreference === 'en' || langPreference === 'es')) {
      setLanguage(langPreference);
      setScreen('welcome');
    } else {
      setScreen('language');
    }
  }, []);

  const handleSelectLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setScreen('welcome');
  }, []);

  const handleStartChat = useCallback(() => {
    setScreen('chat');
  }, []);
  
  const handleToggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newIsDarkMode = !prev;
      if (newIsDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', String(newIsDarkMode));
      return newIsDarkMode;
    });
  }, []);

  const handleChangeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  return (
    <>
      {screen === 'language' && (
        <LanguageModal onSelectLanguage={handleSelectLanguage} />
      )}
      {screen === 'welcome' && (
        <WelcomeScreen
          language={language}
          onStartChat={handleStartChat}
        />
      )}
      {screen === 'chat' && (
        <ChatInterface
          language={language}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onChangeLanguage={handleChangeLanguage}
        />
      )}
    </>
  );
}

export default App;
