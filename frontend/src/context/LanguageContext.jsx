import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('English');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
