import { ResourceService } from '../services/resourceService.js';

export class ResourceController {
  static async getAll(req, res) {
    try {
      const resources = await ResourceService.getAll();
      res.json(resources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      res.status(500).json({ message: 'Failed to fetch resources' });
    }
  }

  static async create(req, res) {
    try {
      const { title, type } = req.body;
      const file = req.file;

      if (!file && !req.body.content) {
        return res.status(400).json({ message: 'No file or content provided' });
      }

      let content;
      if (req.body.content) {
        content = JSON.parse(req.body.content);
      } else {
        content = file.path;
      }

      const resource = await ResourceService.create(title, type, content);
      res.status(201).json(resource);
    } catch (error) {
      console.error('Failed to create resource:', error);
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ResourceService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Failed to delete resource:', error);
      res.status(500).json({ message: 'Failed to delete resource' });
    }
  }
}