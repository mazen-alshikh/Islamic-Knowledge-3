import { v4 as uuidv4 } from 'uuid';
import { getDb, tables, query, queryAll, run, transaction } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { ValidationError } from '../utils/errors.js';
import { validateResourceData } from '../utils/validation.js';

export class ResourceService {
  static async getAll() {
    try {
      return queryAll(`
        SELECT * FROM ${tables.resources} 
        ORDER BY created_at DESC
      `);
    } catch (error) {
      logger.error('Error getting all resources:', error);
      throw error;
    }
  }

  static async create(title, type, content, metadata = {}) {
    try {
      const validatedContent = await validateResourceData(content, type);
      const id = uuidv4();
      const timestamp = new Date().toISOString();

      run(`
        INSERT INTO ${tables.resources} (
          id, 
          title, 
          type, 
          content,
          metadata,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        id,
        title,
        type,
        JSON.stringify(validatedContent),
        JSON.stringify(metadata),
        timestamp,
        timestamp
      ]);

      return { id, title, type };
    } catch (error) {
      logger.error('Error creating resource:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = run(`
        DELETE FROM ${tables.resources} 
        WHERE id = ?
      `, [id]);

      if (result.changes === 0) {
        throw new ValidationError('Resource not found');
      }

      return true;
    } catch (error) {
      logger.error('Error deleting resource:', error);
      throw error;
    }
  }
}