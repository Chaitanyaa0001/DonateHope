import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import redis from '../../config/redisClient.js';
import { verifyRefreshToken } from '../../utils/generateToken.js';

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        const { userId, sessionId } = decoded;
        await redis.del(`session:${userId}:${sessionId}`);
      } catch {}
    }

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Logout failed' });
  }
};
