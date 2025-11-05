import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_EXPIRE = process.env.ACCESS_EXPIRE ;
const REFRESH_EXPIRE = process.env.REFRESH_EXPIRE;

export interface TokenPayload {
  userId: string;
  role: string;
  sessionId?: string;
}

export const generateAccessToken = (userId: string, role: string) => {
  const payload: TokenPayload = { userId, role };
  const options: SignOptions = { expiresIn: ACCESS_EXPIRE as SignOptions['expiresIn'] };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const generateRefreshToken = (userId: string, role: string) => {
  const sessionId = uuid(); 
  const payload: TokenPayload = { userId, role, sessionId };
  const options: SignOptions = { expiresIn: REFRESH_EXPIRE as SignOptions['expiresIn'] };
  const token = jwt.sign(payload, JWT_REFRESH_SECRET, options);
  return { token, sessionId };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
};
