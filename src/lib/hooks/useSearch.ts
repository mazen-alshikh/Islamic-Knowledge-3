import { useState } from 'react';
import { Question } from '../../types';
import { searchQuestion } from '../api';

interface UseSearchResult {
  isLoading: boolean;
  error: string | null;
  answer: Question | null;
  search: (query: string) => Promise<void>;
}

export function useSearch(): UseSearchResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Question | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchQuestion(query);
      setAnswer(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
      setAnswer(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, answer, search };
}