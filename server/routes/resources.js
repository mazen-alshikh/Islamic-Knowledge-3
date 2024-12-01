import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ResourceController } from '../controllers/resourceController.js';

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, '..', 'uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.get('/', ResourceController.getAll);
router.post('/', upload.single('file'), ResourceController.create);
router.delete('/:id', ResourceController.delete);

export { router as resourceRoutes };