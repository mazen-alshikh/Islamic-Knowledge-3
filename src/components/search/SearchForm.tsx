import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLocale } from '../../contexts/LocaleContext';
import { getTranslation } from '../../lib/i18n';

interface SearchFormProps {
  onSearch: (query: string) => Promise<void>;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const { locale } = useLocale();
  const t = getTranslation(locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.home.searchPlaceholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          disabled={isLoading || !query.trim()}
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}