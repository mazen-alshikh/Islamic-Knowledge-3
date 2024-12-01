import { Resource } from '../../types';
import { API_URL, ApiError } from './config';

export async function uploadResource(data: FormData): Promise<Resource> {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/resources`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: data,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new ApiError(response.status, error.message);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error occurred while uploading');
  }
}

export async function getResources(): Promise<Resource[]> {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/resources`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch resources' }));
      throw new ApiError(response.status, error.message);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error occurred while fetching resources');
  }
}

export async function deleteResource(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete resource' }));
      throw new ApiError(response.status, error.message);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error occurred while deleting resource');
  }
}