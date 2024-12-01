import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { getDb, tables, query, run } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { ValidationError } from '../utils/errors.js';

export class UserService {
  static async findByEmail(email) {
    try {
      return query(`SELECT * FROM ${tables.users} WHERE email = ?`, [email]);
    } catch (error) {
      logger.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async verifyPassword(hashedPassword, plainPassword) {
    try {
      return bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      logger.error('Error verifying password:', error);
      throw error;
    }
  }

  static async createUser(email, password, role = 'user') {
    try {
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new ValidationError('Email already registered');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const id = uuidv4();

      run(`
        INSERT INTO ${tables.users} (id, email, password, role)
        VALUES (?, ?, ?, ?)
      `, [id, email, hashedPassword, role]);

      return { id, email, role };
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }
}