import express from 'express';
import { SearchController } from '../controllers/searchController.js';

const router = express.Router();

router.post('/', SearchController.search);

export { router as searchRoutes };