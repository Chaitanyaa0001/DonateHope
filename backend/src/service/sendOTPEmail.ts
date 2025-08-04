import { transporter } from "../config/email.js";
import dotenv from 'dotenv';
dotenv.config();

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  const mailOptions = {
    from: `DonateHope <${process.env.USER}>`, // use your Gmail here
    to: email,
    subject: 'Your DonateHope OTP',
    html: `<p>Your OTP for login is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
  };

  try {
    console.log(`Sending OTP to ${email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    throw err;
  }
};
