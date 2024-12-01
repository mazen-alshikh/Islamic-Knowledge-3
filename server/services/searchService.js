import { getDb, tables, queryAll } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { initializeSearchIndex, searchVerses } from '../utils/search.js';

let searchIndex = null;

export class SearchService {
  static async initializeIndex() {
    try {
      if (searchIndex) return;

      const verses = queryAll(`
        SELECT * FROM ${tables.verses}
        ORDER BY chapter_number, verse_number
      `);

      searchIndex = initializeSearchIndex(verses);
      logger.info('Search index initialized successfully');
    } catch (error) {
      logger.error('Error initializing search index:', error);
      throw error;
    }
  }

  static async search(query) {
    try {
      await this.initializeIndex();

      const verses = queryAll(`
        SELECT * FROM ${tables.verses}
        ORDER BY chapter_number, verse_number
      `);

      const results = searchVerses(query, verses, searchIndex);

      if (results.length === 0) {
        return {
          answer: "No relevant results found.",
          references: []
        };
      }

      // Store the question and create reference links
      const questionId = await this.storeQuestion(query, results[0].verse.text_translation);
      await this.createReferenceLinks(questionId, results);

      const mainVerse = results[0].verse;
      return {
        answer: `${mainVerse.text_uthmani}\n\nTranslation: ${mainVerse.text_translation}`,
        references: results.map(result => ({
          resourceId: result.verse.id,
          metadata: {
            chapter: result.verse.chapter_number,
            verse: result.verse.verse_number,
            page: result.verse.page_number,
            juz: result.verse.juz_number
          }
        }))
      };
    } catch (error) {
      logger.error('Error performing search:', error);
      throw error;
    }
  }

  static async storeQuestion(text, answer) {
    const { v4: uuidv4 } = await import('uuid');
    const id = uuidv4();
    
    const db = getDb();
    db.run(`
      INSERT INTO ${tables.questions} (id, text, answer)
      VALUES (?, ?, ?)
    `, [id, text, answer]);

    return id;
  }

  static async createReferenceLinks(questionId, results) {
    const { v4: uuidv4 } = await import('uuid');
    const db = getDb();

    for (const result of results) {
      const id = uuidv4();
      const metadata = {
        chapter: result.verse.chapter_number,
        verse: result.verse.verse_number,
        page: result.verse.page_number,
        juz: result.verse.juz_number
      };

      db.run(`
        INSERT INTO ${tables.reference_links} (id, question_id, resource_id, metadata)
        VALUES (?, ?, ?, ?)
      `, [id, questionId, result.verse.id, JSON.stringify(metadata)]);
    }
  }
}