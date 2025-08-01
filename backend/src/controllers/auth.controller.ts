// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken } from '../utils/generateToken';

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, phone, fullName, role } = req.body;

    // Require either email or phone
    if (!email && !phone) {
      return res.status(400).json({ message: 'Email or phone is required' });
    }

    // Find existing user by email or phone
    let user = await User.findOne({ $or: [{ email }, { phone }] });

    // If no user exists, require role and create new verified user (OTP assumed verified before this call)
    if (!user) {
      if (!role) {
        return res.status(400).json({ message: 'Role is required for new user registration' });
      }
      user = new User({ email, phone, fullName, role, isVerified: true });
      await user.save();
    }

    // Ensure the user has verified via OTP
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your account via OTP' });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString(), user.role);

    // Send response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
