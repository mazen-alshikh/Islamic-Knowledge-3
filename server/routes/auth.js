import express from 'express';
import asyncHandler from 'express-async-handler';
import { AuthController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', asyncHandler(AuthController.login));
router.post('/register', asyncHandler(AuthController.register));

export { router as authRoutes };