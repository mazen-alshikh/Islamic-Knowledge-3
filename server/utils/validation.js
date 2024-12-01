import { z } from 'zod';
import { logger } from './logger.js';
import { ValidationError } from './errors.js';

const resourceSchemas = {
  quran: z.array(z.object({
    chapter: z.number(),
    verse: z.number(),
    text: z.string(),
    translation: z.string().optional()
  })),
  
  hadith: z.array(z.object({
    book: z.string(),
    number: z.number(),
    text: z.string(),
    narrator: z.string().optional()
  })),
  
  tafsir: z.array(z.object({
    chapter: z.number(),
    verse: z.number(),
    text: z.string(),
    author: z.string().optional()
  })),
  
  fiqh: z.array(z.object({
    topic: z.string(),
    text: z.string(),
    source: z.string().optional()
  }))
};

export async function validateResourceData(content, type) {
  try {
    const schema = resourceSchemas[type];
    if (!schema) {
      throw new ValidationError('Invalid resource type');
    }

    let data = content;
    if (typeof content === 'string') {
      try {
        data = JSON.parse(content);
      } catch (error) {
        throw new ValidationError('Invalid JSON format');
      }
    }

    return schema.parse(data);
  } catch (error) {
    logger.error('Resource validation failed:', error);
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw error;
  }
}

export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['user', 'admin']).default('user')
});

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required')
});