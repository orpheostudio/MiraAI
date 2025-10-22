import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './constants';
import LanguageModal from './components/LanguageModal';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';
import { getDeviceId, getUserPreferences, saveUserPreferences } from './services/supabaseService';
import { sendWelcomeNotification } from './services/notificationService';

type Screen = 'language' | 'welcome' | 'chat';

function App() {
  const [screen, setScreen] = useState<Screen>('language');
  const [language, setLanguage] = useState<Language>('pt');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPreferences = async () => {
      const deviceId = getDeviceId();
      const prefs = await getUserPreferences(deviceId);

      if (prefs) {
        // Found settings in Supabase
        setLanguage(prefs.language);
        setIsDarkMode(prefs.is_dark_mode);
        if (prefs.is_dark_mode) {
          document.documentElement.classList.add('dark');
        }
        localStorage.removeItem('language');
        localStorage.removeItem('darkMode');
        setScreen('welcome');
      } else {
        // No settings in Supabase, check local storage for migration
        const langPreference = localStorage.getItem('language');
        const darkModePreference = localStorage.getItem('darkMode');
        if (langPreference && (langPreference === 'pt' || langPreference === 'en' || langPreference === 'es')) {
          const lang = langPreference as Language;
          const isDark = darkModePreference === 'true';
          
          setLanguage(lang);
          setIsDarkMode(isDark);
          if (isDark) {
            document.documentElement.classList.add('dark');
          }
          
          // Save migrated settings to Supabase and clear local storage
          await saveUserPreferences(deviceId, { language: lang, is_dark_mode: isDark });
          // Send notification for migrated user, as this is their first save to the new system.
          sendWelcomeNotification(deviceId, lang);
          localStorage.removeItem('language');
          localStorage.removeItem('darkMode');
          setScreen('welcome');
        } else {
          // Truly a new user
          setScreen('language');
        }
      }
      setIsLoading(false);
    };

    loadPreferences();
  }, []);

  const handleSelectLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setScreen('welcome');
    const deviceId = getDeviceId();
    // Save initial preferences
    saveUserPreferences(deviceId, { language: lang, is_dark_mode: isDarkMode });
    // Send notification for brand new user.
    sendWelcomeNotification(deviceId, lang);
  }, [isDarkMode]);

  const handleStartChat = useCallback(() => {
    setScreen('chat');
  }, []);
  
  const handleToggleDarkMode = useCallback(() => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const deviceId = getDeviceId();
    saveUserPreferences(deviceId, { is_dark_mode: newIsDarkMode });
  }, [isDarkMode]);

  const handleChangeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    const deviceId = getDeviceId();
    saveUserPreferences(deviceId, { language: lang });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
