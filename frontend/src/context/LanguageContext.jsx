import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'en';
  });

  const t = useCallback(
    (key) => {
      const currentTranslations = translations[language] || translations.en;
      return currentTranslations[key] || translations.en[key] || key;
    },
    [language]
  );

  const changeLanguage = useCallback((langCode) => {
    setLanguage(langCode);
    localStorage.setItem('app-language', langCode);
    document.documentElement.lang = langCode;
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
