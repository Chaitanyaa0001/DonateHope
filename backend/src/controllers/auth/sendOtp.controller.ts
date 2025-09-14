import { Request, Response } from 'express';
import User from '../../models/user.model.js';
import { generateOTP } from '../../utils/otp.js';
import { sendOTPEmail } from '../../service/sendOTPEmail.js';

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const { email, role, fullname } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    };

    let user = await User.findOne({ email });

    if (!user) {
      if (!role || !fullname) {
        return res.status(400).json({ message: 'Role and full name are required for new users' });
      }

      user = new User({
        email,
        role,
        fullname,
      });
    }else{
      if (role && user.role !== role) {  // ✅ fixed typo
  return res.status(400).json({
    message: `User already registered as ${user.role}. You cannot log in as ${role} with the same email.`,
  });
}

    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendOTPEmail(email, otp);

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
