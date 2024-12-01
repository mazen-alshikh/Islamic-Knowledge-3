import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/upload/FileUpload';
import { UploadProgress } from '../../components/upload/UploadProgress';
import { useUpload } from '../../hooks/useUpload';
import { useLocale } from '../../contexts/LocaleContext';
import { getTranslation } from '../../lib/i18n';
import { RESOURCE_TYPES } from '../../lib/constants';
import { resourceSchema, type ResourceFormData } from '../../lib/utils/validation';
import { parseExcelFile, validateExcelData, formatExcelData } from '../../lib/utils/file';

export function ResourceUpload() {
  const navigate = useNavigate();
  const { locale, isRTL } = useLocale();
  const t = getTranslation(locale);
  const { upload, progress, isUploading, error: uploadError } = useUpload();
  
  const methods = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    mode: 'onChange'
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = methods;

  const onSubmit = async (data: ResourceFormData) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('type', data.type);

      const file = data.file[0];
      if (!file) {
        throw new Error(t.resources.errors.requiredFields);
      }

      if (file.name.endsWith('.xlsx')) {
        const excelData = await parseExcelFile(file);
        if (!validateExcelData(excelData, data.type)) {
          throw new Error(t.resources.errors.invalidFormat);
        }
        const formattedData = formatExcelData(excelData, data.type);
        formData.append('content', JSON.stringify(formattedData));
      } else {
        formData.append('file', file);
      }

      await upload(formData);
      navigate('/admin');
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.resources.upload}</h1>

      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{uploadError}</p>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label={t.resources.titleLabel}
              {...register('title')}
              error={errors.title?.message}
              dir={isRTL ? 'rtl' : 'ltr'}
            />

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                {t.resources.typeLabel}
              </label>
              <select
                {...register('type')}
                className={`mt-1 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md ${
                  isRTL ? 'pr-3 pl-10' : 'pl-3 pr-10'
                }`}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="">{t.resources.selectType}</option>
                {Object.values(RESOURCE_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {t.resources.types[type]}
                  </option>
                ))}
              </select>
              {errors.type?.message && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <FileUpload 
              name="file" 
              error={errors.file?.message}
            />

            {isUploading && <UploadProgress progress={progress} />}

            <Button
              type="submit"
              className="w-full"
              disabled={isUploading}
            >
              {isUploading ? t.common.loading : t.resources.upload}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}