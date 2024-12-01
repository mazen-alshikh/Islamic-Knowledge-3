import React from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from '../../contexts/LocaleContext';
import { SUPPORTED_LOCALES, LOCALE_NAMES } from '../../lib/constants';
import { Button } from './Button';

export function LocaleSwitch() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative inline-block text-right">
      <div className="flex items-center space-x-2">
        <Globe className="w-5 h-5" />
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as typeof SUPPORTED_LOCALES[number])}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <option key={loc} value={loc}>
              {LOCALE_NAMES[loc]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}