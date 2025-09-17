import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAccessToken } from '../../utils/generateToken.js';

dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  };

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload;
     console.log(decoded);
    if (!decoded || typeof decoded === 'string' || !decoded.userId || !decoded.role) {
      return res.status(403).json({ message: 'Invalid refresh token payload' });
    };

    const accessToken = generateAccessToken(decoded.userId, decoded.role);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

     return res.status(200).json({
      message: "Access token refreshed successfully",
      role: decoded.role,
      userId: decoded.userId,
    });

   
    

  } catch (err) {
    console.error('Refresh token error', err);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
