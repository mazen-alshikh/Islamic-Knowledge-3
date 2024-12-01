import React from 'react';
import { Upload } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useLocale } from '../../contexts/LocaleContext';
import { getTranslation } from '../../lib/i18n';

interface FileUploadProps {
  name: string;
  error?: string;
}

export function FileUpload({ name, error }: FileUploadProps) {
  const { register, watch } = useFormContext();
  const { locale, isRTL } = useLocale();
  const t = getTranslation(locale);
  
  const file = watch(name);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {t.resources.fileLabel}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex flex-col items-center text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
            >
              <span>{t.resources.uploadFile}</span>
              <input
                id={name}
                type="file"
                className="sr-only"
                accept=".json,.csv,.xlsx"
                {...register(name)}
              />
            </label>
            <p className={`${isRTL ? 'mr-1' : 'ml-1'}`}>
              {t.resources.dragDrop}
            </p>
            {file?.[0] && (
              <p className="mt-2 text-sm text-emerald-600">
                {file[0].name}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {t.resources.fileTypes}
          </p>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}