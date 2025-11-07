import { Request, Response } from 'express';
import User from '../../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js';
import redis from '../../config/redisClient.js';

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp)
      return res.status(400).json({ message: "OTP and identifier required" });

    const savedOTP = await redis.get(`otp:${identifier}`);
    if (!savedOTP || savedOTP !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const user = await User.findOne({ email: identifier });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    // Clean up OTP data
    await redis.del(`otp:${identifier}`);
    await redis.del(`otp_attempts:${identifier}`);
    await redis.del(`otp_rate_limit:${identifier}`);

    // Tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const { token: refreshToken, sessionId } = generateRefreshToken(user._id.toString(), user.role);

    await redis.set(
      `session:${user._id}:${sessionId}`,
      'valid',
      'EX',
      60 * 60 * 24 * 7 // 7 days
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "OTP verified",
      role: user.role,
      userId: user._id.toString(),
      accessToken,
    });
  } catch (err) {
    console.error("verifyOTP error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};