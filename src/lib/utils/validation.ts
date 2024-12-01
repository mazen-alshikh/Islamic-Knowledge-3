import { z } from 'zod';
import { RESOURCE_TYPES } from '../constants';

export const resourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum([
    RESOURCE_TYPES.QURAN,
    RESOURCE_TYPES.HADITH,
    RESOURCE_TYPES.TAFSIR,
    RESOURCE_TYPES.FIQH
  ], {
    required_error: 'Please select a resource type',
  }),
  file: z.any()
    .refine((files) => files?.length > 0, "Please select a file")
    .transform(files => files as FileList)
});

export type ResourceFormData = z.infer<typeof resourceSchema>;

export const searchSchema = z.object({
  query: z.string().min(1, 'Query is required'),
});

export type SearchFormData = z.infer<typeof searchSchema>;