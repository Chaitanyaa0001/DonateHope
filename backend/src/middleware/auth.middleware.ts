import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid/Expired token' });
  }
};
