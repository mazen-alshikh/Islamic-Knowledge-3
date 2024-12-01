import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

import { initializeDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';
import { authRoutes } from './routes/auth.js';
import { resourceRoutes } from './routes/resources.js';
import { searchRoutes } from './routes/search.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Ensure required directories exist
const dirs = [
  join(__dirname, 'data'),
  join(__dirname, 'uploads'),
  join(__dirname, 'logs')
];

dirs.forEach(dir => {
  try {
    mkdirSync(dir, { recursive: true });
  } catch (err) {
    logger.error(`Failed to create directory ${dir}:`, err);
  }
});

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/search', searchRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
async function bootstrap() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();