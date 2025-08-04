import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TWO_FACTOR_API_KEY;

export const sendOTPPhone = async (
  phone: string,
  otp: string,
  fullname: string,
  role: 'funder' | 'donar'
): Promise<boolean> => {
  const SENDER_ID = role === 'funder' ? 'FUNDER' : 'DONAR';
  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN/${SENDER_ID}`
    );

    return response.data.Status === 'Success';
  } catch (err: any) {
    console.error('Phone SMS error:', err.response?.data || err.message || err);
    return false;
  }
};
