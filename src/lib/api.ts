import type { Resource, Question } from '../types';

const API_URL = 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(response.status, error.message);
  }

  return response.json();
}

export async function uploadResource(data: FormData): Promise<Resource> {
  return request('/resources', {
    method: 'POST',
    headers: {},
    body: data,
  });
}

export async function getResources(): Promise<Resource[]> {
  return request('/resources');
}

export async function deleteResource(id: string): Promise<void> {
  await request(`/resources/${id}`, {
    method: 'DELETE',
  });
}

export async function searchQuestion(query: string): Promise<Question> {
  return request('/search', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
}

export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await request<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('token', response.token);
  return response;
}

export function logout(): void {
  localStorage.removeItem('token');
}