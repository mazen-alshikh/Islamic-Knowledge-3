import { verifyToken } from '../utils/jwt.js';

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const payload = await verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}