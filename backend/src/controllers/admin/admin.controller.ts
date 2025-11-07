import { Request, Response } from "express";
import User from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import { generateOTP } from "../../utils/otp.js";
import { sendotpemail } from "../../service/email.service.js";
import redis from "../../config/redisClient.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" }).select("+password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    
    if (!admin.password) return res.status(500).json({ message: "Password not set" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const otp = generateOTP();
    await redis.setex(`otp_admin:${email}`, 300, otp);
    await sendotpemail(email, otp);

    res.status(200).json({ message: "OTP sent to admin email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyAdminOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const savedOTP = await redis.get(`otp_admin:${email}`);

    if (!savedOTP || savedOTP !== otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    await redis.del(`otp_admin:${email}`);

    const accessToken = generateAccessToken(admin._id.toString(), admin.role);
    const { token: refreshToken, sessionId } = generateRefreshToken(admin._id.toString(), admin.role);

    await redis.set(
      `session:${admin._id}:${sessionId}`,
      "valid",
      "EX",
      7 * 24 * 60 * 60
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
      accessToken,
      role: admin.role,
      userId: admin._id,
    });
  } catch (err) {
    console.error("verifyAdminOTP error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
