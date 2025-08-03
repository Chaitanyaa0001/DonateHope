// import { Request, Response } from 'express';
// import User from '../models/user.model';
// import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';

// export const authLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, phone, role, fullName } = req.body;

//     if (!email && !phone) {
//       return res.status(400).json({ message: 'Email or phone is required' });
//     }

//     let user = await User.findOne({ $or: [{ email }, { phone }] });

//     if (!user) {
//       if (!role) return res.status(400).json({ message: 'Role required for new user' });
//       user = new User({ email, phone, fullName, role, isVerified: true });
//       await user.save();
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({ message: 'Verify account via OTP' });
//     }

//     const accessToken = generateAccessToken(user._id.toString(), user.role);
//     const refreshToken = generateRefreshToken(user._id.toString(), user.role);

//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'strict',
//       maxAge: 15 * 60 * 1000,
//     });

//     res.cookie('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.status(200).json({
//       message: 'Login successful',
//       user: {
//         id: user._id,
//         email: user.email,
//         phone: user.phone,
//         fullname: user.fullname,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const refreshToken = (req: Request, res: Response) => {
//   const token = req.cookies.refreshToken;
//   if (!token) return res.status(401).json({ message: 'Refresh token missing' });

//   try {
//     const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
//     const accessToken = generateAccessToken(payload.userId, payload.role);

//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'strict',
//       maxAge: 15 * 60 * 1000,
//     });

//     return res.status(200).json({ message: 'Token refreshed' });
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid refresh token' });
//   }
// };
