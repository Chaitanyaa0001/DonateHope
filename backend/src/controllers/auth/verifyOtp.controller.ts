import { Request, Response } from 'express';
import User from '../../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js';
import redis from '../../config/redisClient.js';

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ message: "OTP and identifier are required" });
    }

    // Check OTP in Redis
    const savedOTP = await redis.get(`otp:${identifier}`);
    if (!savedOTP || savedOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP or identifier" });
    }
    // OTP verified
    const user = await User.findOne({ email: identifier });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();
    await redis.del(`otp:${identifier}`);

    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString(), user.role);

  
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ message: "OTP verified", role: user.role, userId: user._id.toString(), accessToken });
  } catch (err) {
    console.error('OTP verification error', err);
    res.status(500).json({ message: "Internal server error" });
  }
};
