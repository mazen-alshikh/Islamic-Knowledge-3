import React from 'react';
import { SearchForm } from '../components/search/SearchForm';
import { SearchResults } from '../components/search/SearchResults';
import { useSearch } from '../lib/hooks/useSearch';
import { useLocale } from '../contexts/LocaleContext';
import { getTranslation } from '../lib/i18n';

export function Home() {
  const { locale } = useLocale();
  const t = getTranslation(locale);
  const { isLoading, error, answer, search } = useSearch();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.home.title}
        </h1>
        <p className="text-lg text-gray-600">
          {t.home.subtitle}
        </p>
      </div>

      <SearchForm onSearch={search} isLoading={isLoading} />
      <SearchResults answer={answer} isLoading={isLoading} error={error} />
    </div>
  );
}