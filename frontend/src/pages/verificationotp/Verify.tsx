import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMail /*, FiPhone */ } from 'react-icons/fi';
import {  useDispatch } from 'react-redux';
import { verifyOTP } from '@/hooks/auth/uselogin';
import { setAuth } from '@/redux/authSlice';

interface LocationState {
  method: 'email'; 
  destination: string;
}

const Verify: React.FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const {  destination } = location.state as LocationState;

  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    try {
      const res = await verifyOTP(destination, enteredOtp);
if (!res || !res.userId || !res.accessToken) {
  console.error('verifyOTP missing userId or accessToken', res);
  // show the user an error toast/message here
  return;
}

dispatch(setAuth({ role: res.role, userId: res.userId, accessToken: res.accessToken }));
// optionally persist accessToken temporarily to localStorage for dev
localStorage.setItem('accessToken', res.accessToken);
if (res.role === 'donor') navigate('/explore');
else navigate('/register');

    } catch (err) {
      console.error("Error verifying OTP", err);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="w-[90%] sm:w-[60%] lg:w-[30%] mx-auto py-8 px-5 
          bg-white/70 dark:bg-[#020817]/80 backdrop-blur-md
          rounded-[6px] border-[#9810FA] border-2 
          shadow-md shadow-gray-600 dark:shadow-none flex flex-col items-center">

          <div className="flex flex-row items-center justify-center relative w-full">
            <FiMail className="text-white text-5xl p-2 bg-purple-600 rounded-[6px] shadow-md hover:bg-purple-700 transition" />
            {/* 
            // 🔒 Only using email now
            {method === 'email' ? (
              <FiMail className="..." />
            ) : (
              <FiPhone className="..." />
            )}
            */}
            {/* <Togglebutton /> */}
          </div>

          <h1 className="text-2xl font-semibold mt-6">Verify Email</h1>
          <p className="text-[0.9rem] text-center opacity-75 mt-2 mb-4 italic">
            Enter the 6-digit code sent to <br />
            <span className="font-medium">{destination}</span>
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="flex gap-3 my-5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  placeholder="•"
                  className="text-center text-lg font-semibold w-12 h-12 sm:h-14 sm:w-14 rounded-md p-3 border-2 focus:outline-none focus:border-purple-600 bg-transparent dark:text-white"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => {
                    if (el) inputRefs.current[idx] = el;
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Verify OTP
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-purple-700 mt-4 hover:underline"
          >
            ← Back to contact info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
