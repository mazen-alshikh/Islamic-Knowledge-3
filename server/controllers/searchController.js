import { SearchService } from '../services/searchService.js';

export class SearchController {
  static async search(req, res) {
    const { query } = req.body;
    
    try {
      const results = await SearchService.search(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Search failed' });
    }
  }
}