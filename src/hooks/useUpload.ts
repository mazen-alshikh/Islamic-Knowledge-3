import { useState } from 'react';
import { uploadResource } from '../lib/api';
import { Resource } from '../types';

interface UseUploadResult {
  upload: (formData: FormData) => Promise<Resource>;
  progress: number;
  isUploading: boolean;
  error: string | null;
}

export function useUpload(): UseUploadResult {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (formData: FormData): Promise<Resource> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const resource = await uploadResource(formData);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      return resource;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, progress, isUploading, error };
}