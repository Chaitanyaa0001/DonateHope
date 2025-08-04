
import { transporter } from "../config/email";

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  const mailOptions = {
    from: 'DonateHope <no-reply@donatehope.org>',
    to: email,
    subject: 'Your DonateHope OTP',
    html: `<p>Your OTP for login is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
