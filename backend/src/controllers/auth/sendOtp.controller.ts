// src/controllers/auth/sendOtp.controller.ts
import { Request, Response } from 'express';
import User from '../../models/user.model.js';
import { generateOTP } from '../../utils/otp.js';
import { sendotpemail } from '../../service/email.service.js';
import redis from '../../config/redisClient.js';

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email, role} = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Rate limiting in Redis
    const rateLimiterKey = `otp_rate_limit:${email}`;
    const attemptsKey = `otp_attempts:${email}`;
    const isLimited = await redis.exists(rateLimiterKey);

    if (isLimited) {
      return res.status(429).json({ message: "Please wait 60 seconds before requesting a new OTP" });
    };

    await redis.set(rateLimiterKey, '1', 'EX', 60);
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) await redis.expire(attemptsKey, 600);
    if (attempts > 5) {
      return res.status(429).json({ message: "Too many OTP requests. Try again later." });
    }

    let user = await User.findOne({ email });

    if (!user) {
        const nameFromEmail = email.split('@')[0]
        .replace(/[._-]/g, ' ')        // replace dots, underscores, dashes with space
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
        const assignedRole = 'user';
        user = new User({ email, fullname: nameFromEmail, role: assignedRole });
        await user.save();
      } else if (role && user.role !== role) {
        return res.status(400).json({
          message: `User already registered as ${user.role}. Cannot log in as ${role} with same email.`,
        });
      }


    const otp = generateOTP();
    await redis.setex(`otp:${email}`, 300, otp);
    await sendotpemail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};
