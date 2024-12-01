import { Question } from '../../types';
import { API_URL, ApiError } from './config';

export async function searchQuestion(query: string): Promise<Question> {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Search failed' }));
      throw new ApiError(response.status, error.message);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error occurred while searching');
  }
}