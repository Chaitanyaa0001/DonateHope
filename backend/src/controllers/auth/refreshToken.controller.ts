import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAccessToken } from '../../utils/generateToken.js';
import User from '../../models/user.model.js';

dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload;

    if (!decoded || typeof decoded === 'string' || !decoded.userId || !decoded.role) {
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: false,
        sameSite:'lax',
        path: '/',
      });
      return res.status(403).json({ message: 'Invalid refresh token payload' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
      });
      return res.status(401).json({ message: 'User no longer exists' });
    }

    const accessToken = generateAccessToken(user._id.toString(), user.role);

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
      role: user.role,
      userId: user._id.toString(),
    });
  } catch (err) {
    console.error('Refresh token error', err);
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
