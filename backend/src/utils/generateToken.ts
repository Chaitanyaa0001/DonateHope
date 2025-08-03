import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_EXPIRE = process.env.ACCESS_EXPIRE || '15m';
const REFRESH_EXPIRE = process.env.REFRESH_EXPIRE || '7d';


interface TokenPayload {
  user: string;
  role:string
}

export const generateAccessToken =(user:string,role:string) =>{
  const payload: TokenPayload = {user,role};
  const options: SignOptions = {expiresIn:ACCESS_EXPIRE as SignOptions['expiresIn']}
  return jwt.sign(payload,JWT_SECRET,options)
}
export const generateRefreshToken = (user:string,role:string)=>{
  const paylaod: TokenPayload = {user,role}
}

// if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
//   throw new Error('JWT secrets are not defined in the environment variables');
// }

// interface TokenPayload {
//   userId: string;
//   role: string;
// }

// export const generateAccessToken = (userId: string, role: string): string => {
//   const payload: TokenPayload = { userId, role };
// const options: SignOptions = { expiresIn: ACCESS_EXPIRE as SignOptions['expiresIn'] };
//   return jwt.sign(payload, JWT_SECRET, options);
// };

// export const generateRefreshToken = (userId: string, role: string): string => {
//   const payload: TokenPayload = { userId, role };
// const options: SignOptions = { expiresIn: ACCESS_EXPIRE as SignOptions['expiresIn'] };
//   return jwt.sign(payload, JWT_REFRESH_SECRET, options);
// };

// export const verifyAccessToken = (token: string): TokenPayload => {
//   return jwt.verify(token, JWT_SECRET) as TokenPayload;
// };

// export const verifyRefreshToken = (token: string): TokenPayload => {
//   return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
// };


