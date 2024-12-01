import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, DEFAULT_LOCALE, RTL_LOCALES } from '../lib/constants';
import { getCurrentLocale, setLocale } from '../lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  isRTL: RTL_LOCALES.includes(DEFAULT_LOCALE),
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setCurrentLocale] = useState<Locale>(getCurrentLocale());
  const isRTL = RTL_LOCALES.includes(locale);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale, isRTL]);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setCurrentLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, isRTL }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}