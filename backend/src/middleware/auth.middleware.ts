import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';  // ✅ import your User model
import { TokenPayload } from '../utils/generateToken.js';

dotenv.config();

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload | jwt.JwtPayload;
    if (!decoded || typeof decoded === 'string' || !('userId' in decoded)) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      return res.status(401).json({ message: 'User no longer exists. Please log in again.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
