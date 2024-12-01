import { getDb, tables, transaction, queryAll } from '../config/database.js';
import { loadQuranData } from '../data/quran/index.js';
import { initializeSearchIndex, searchVerses } from '../utils/search.js';

let searchIndex = null;

export class QuranService {
  static async initializeDataset() {
    try {
      const verses = await loadQuranData();
      
      // Initialize search index
      searchIndex = initializeSearchIndex(verses);
      
      // Insert verses in a transaction
      transaction(() => {
        verses.forEach(verse => {
          getDb().run(`
            INSERT OR REPLACE INTO ${tables.verses} (
              id,
              chapter_number,
              verse_number,
              text_uthmani,
              text_translation,
              page_number,
              juz_number
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
          `, [
            verse.id,
            verse.chapter_number,
            verse.verse_number,
            verse.text_arabic,
            verse.translation,
            verse.page,
            verse.juz
          ]);
        });
      });
      
      console.log(`Initialized ${verses.length} verses`);
      return true;
    } catch (error) {
      console.error('Failed to initialize Quran dataset:', error);
      throw new Error('Failed to initialize Quran dataset');
    }
  }

  static async searchVerses(query) {
    if (!searchIndex) {
      throw new Error('Search index not initialized');
    }
    
    // Get all verses from database
    const verses = queryAll(`
      SELECT * FROM ${tables.verses}
      ORDER BY chapter_number, verse_number
    `);
    
    // Search using the pre-initialized index
    const results = searchVerses(query, verses, searchIndex);
    
    return results.map(result => ({
      text: result.verse.text_translation,
      arabic: result.verse.text_uthmani,
      reference: {
        resourceId: result.verse.id,
        metadata: {
          chapter: result.verse.chapter_number,
          verse: result.verse.verse_number,
          page: result.verse.page_number,
          juz: result.verse.juz_number
        }
      }
    }));
  }
}