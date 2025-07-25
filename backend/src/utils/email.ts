import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure:false,
    auth:{
        user:process.env.BREVO_SMTP_USER,
        pass:process.env.BREVO_SMTP_PASS,
    },
});
