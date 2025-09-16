import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendotpemail = async (toEmail: string, otp: string) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "DonateHope", email: "chaitanyakhurana.workk@gmail.com" }, 
        to: [{ email: toEmail }],
        subject: "Your OTP for DonateHope",
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#4CAF50;">Email Verification</h2>
            <p>Hello,</p>
            <p>Your OTP code is:</p>
            <h1 style="letter-spacing:5px;color:#333;">${otp}</h1>
            <p>This code will expire in <strong>5 minutes</strong>.</p>
            <p style="color:#888;">If you did not request this, please ignore.</p>
          </div>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Brevo response:", response.data);
  } catch (error: any) {
    console.error("Error sending email via Brevo:", error.response?.data || error.message);
    throw new Error("Email sending failed");
  }
};
