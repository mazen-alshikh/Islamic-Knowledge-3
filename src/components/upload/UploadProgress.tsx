import React from 'react';
import { useLocale } from '../../contexts/LocaleContext';
import { getTranslation } from '../../lib/i18n';

interface UploadProgressProps {
  progress: number;
}

export function UploadProgress({ progress }: UploadProgressProps) {
  const { locale } = useLocale();
  const t = getTranslation(locale);

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          {progress === 100 ? t.common.success : t.common.uploading}
        </span>
        <span className="text-sm font-medium text-gray-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}