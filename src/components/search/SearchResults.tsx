import React from 'react';
import { Question } from '../../types';
import { useLocale } from '../../contexts/LocaleContext';
import { getTranslation } from '../../lib/i18n';

interface SearchResultsProps {
  answer: Question | null;
  isLoading: boolean;
  error: string | null;
}

export function SearchResults({ answer, isLoading, error }: SearchResultsProps) {
  const { locale } = useLocale();
  const t = getTranslation(locale);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{t.common.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!answer) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{t.search.answer}</h2>
      <div className="mb-4">
        {answer.answer.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-2">{paragraph}</p>
        ))}
      </div>
      {answer.references && answer.references.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">{t.search.references}</h3>
          <ul className="space-y-2">
            {answer.references.map((ref, index) => (
              <li key={index} className="text-sm text-gray-600">
                {ref.metadata.book && `${t.search.book}: ${ref.metadata.book}, `}
                {ref.metadata.chapter && `${t.search.chapter}: ${ref.metadata.chapter}, `}
                {ref.metadata.verse && `${t.search.verse}: ${ref.metadata.verse}, `}
                {ref.metadata.page && `${t.search.page}: ${ref.metadata.page}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}