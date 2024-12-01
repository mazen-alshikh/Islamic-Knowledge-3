import { UserService } from '../services/userService.js';
import { generateToken } from '../utils/jwt.js';

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findByEmail(email);
      if (!user || !(await UserService.verifyPassword(user.password, password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = await generateToken({
        sub: user.id,
        email: user.email,
        role: user.role
      });

      res.json({ token });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  }

  static async register(req, res) {
    const { email, password } = req.body;

    try {
      const existingUser = await UserService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = await UserService.createUser(email, password);
      const token = await generateToken({
        sub: user.id,
        email: user.email,
        role: user.role
      });

      res.status(201).json({ token });
    } catch (error) {
      console.error('Registration failed:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  }
}