import { API_URL, ApiError } from './config';

export async function login(email: string, password: string): Promise<{ token: string }> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new ApiError(response.status, error.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error occurred during login');
  }
}

export function logout(): void {
  localStorage.removeItem('token');
}