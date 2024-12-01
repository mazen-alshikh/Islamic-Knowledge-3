import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, logout as apiLogout } from '../api/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiLogin(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    apiLogout();
    navigate('/login');
  }, [navigate]);

  return { login, logout, isLoading, error };
}