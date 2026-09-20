import React, { createContext, useContext, useState } from 'react';
import { SupportedLang, UI_STRINGS, LANG_META } from './ui';
import { getTranslatedTitle, getTranslatedEquipment } from './recipes';

interface I18nContextType {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: string) => string;
  recipeTitle: (id: string, name: string, enName: string) => string;
  equipmentName: (tool: string) => string;
  languages: typeof LANG_META;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem('sodalab_lang') as SupportedLang;
    if (saved && ['zh', 'zh-Hans', 'en'].includes(saved)) {
      return saved;
    }
    // Default to English as requested
    return 'en';
  });

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    localStorage.setItem('sodalab_lang', newLang);
  };

  const t = (key: string): string => {
    const str = UI_STRINGS[lang]?.[key] || UI_STRINGS.en?.[key] || key;
    return str;
  };

  const recipeTitle = (id: string, name: string, enName: string): string => {
    return getTranslatedTitle(id, name, enName, lang);
  };

  const equipmentName = (tool: string): string => {
    return getTranslatedEquipment(tool, lang);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, recipeTitle, equipmentName, languages: LANG_META }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
