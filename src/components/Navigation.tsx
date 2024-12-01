import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Home, Settings } from 'lucide-react';
import { LocaleSwitch } from './ui/LocaleSwitch';
import { useLocale } from '../contexts/LocaleContext';
import { getTranslation } from '../lib/i18n';

export function Navigation() {
  const { locale } = useLocale();
  const t = getTranslation(locale);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="w-6 h-6 text-emerald-600" />
            <span className="font-semibold text-lg">{t.home.title}</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
              <Home className="w-5 h-5" />
              <span>{t.common.home}</span>
            </Link>
            <Link to="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600">
              <Settings className="w-5 h-5" />
              <span>{t.common.admin}</span>
            </Link>
            <LocaleSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}