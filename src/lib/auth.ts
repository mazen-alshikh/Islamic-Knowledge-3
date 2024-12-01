import { User } from '../types';

// Simulated authentication state - in a real app, this would use a proper auth system
let currentUser: User | null = null;

export function getCurrentUser(): User | null {
  return currentUser;
}

export async function login(email: string, password: string): Promise<User> {
  // Simulate API call
  if (email === 'admin@example.com' && password === 'admin') {
    currentUser = {
      id: '1',
      email,
      role: 'admin'
    };
    return currentUser;
  }
  throw new Error('Invalid credentials');
}

export async function logout(): Promise<void> {
  currentUser = null;
}