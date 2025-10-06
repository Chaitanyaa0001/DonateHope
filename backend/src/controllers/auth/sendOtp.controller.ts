import { Request, Response } from 'express';
import User from '../../models/user.model.js';
import { generateOTP } from '../../utils/otp.js';
import { sendotpemail } from '../../service/emailservice.js';
import redis from '../../config/redisClient.js';

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email, role, fullname } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const rateLimiterKey = `otp_rate_limit:${email}`;
    const isLimited = await redis.exists(rateLimiterKey);

    if (isLimited) {
      return res.status(429).json({ message: "Please wait 60 seconds before requesting a new OTP" });
    }

    await redis.set(rateLimiterKey, '1', 'EX', 60); // expires in 60 sec

    const attemptsKey = `otp_attempts:${email}`;
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) await redis.expire(attemptsKey, 600); // 10 minutes

    if (attempts > 5) {
      return res.status(429).json({ message: "Too many OTP requests. Try again later." });
    }

    let user = await User.findOne({ email });
    if (!user) {
      if (!role || !fullname) {
        return res.status(400).json({ message: 'Role and full name are required for new users' });
      }
      user = new User({ email, role, fullname });
      await user.save();
    } else if (role && user.role !== role) {
      return res.status(400).json({
        message: `User already registered as ${user.role}. Cannot log in as ${role} with same email.`,
      });
    }

    // 4️⃣ Generate OTP and store in Redis (5 min expiry)
    const otp = generateOTP();
    await redis.setex(`otp:${email}`, 300, otp); 

    await sendotpemail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};






// import { Request, Response } from 'express';
// import User from '../../models/user.model.js';
// import { generateOTP } from '../../utils/otp.js';
// import { sendOTPEmail } from '../../service/sendOTPEmail.js';
// import { sendOTPPhone } from '../../service/sendOTPPhone.js';

// export const requestOTP = async (req: Request, res: Response) => {
//   try {
//     const { email, phone, role, fullname } = req.body;

//     if (!email && !phone) {
//       return res.status(400).json({ message: 'Email or phone is required' });
//     }

//     let user = await User.findOne({ $or: [{ email }, { phone }] });

//     if (!user) {
//       if (!role || !fullname) {
//         return res
//           .status(400)
//           .json({ message: 'Role and full name are required for new users' });
//       }

//       user = new User({
//         email,
//         phone,
//         role,
//         fullname,
//       });
//     }

//     const otp = generateOTP();
//     const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//     user.otp = otp;
//     user.otpExpiresAt = otpExpiresAt;
//     await user.save();

//     if (email) {
//       await sendOTPEmail(email, otp);
//     } else if (phone) {
//       await sendOTPPhone(phone, otp, user.fullname, user.role);
//     }

//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send OTP', error: error.message });
//   }
// };
