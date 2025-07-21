import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { countries } from '@/utils/countries';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '@/redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

type Method = 'email' | 'phone';
type Role = 'donor' | 'fundraiser';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const navigate = useNavigate();

  const [method, setMethod] = useState<Method>('email');
  const [role, setRole] = useState<Role>('donor');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const destination = method === 'email' ? email : `${countryCode}${phone}`;
    const payload = {
      method,
      destination,
      context: 'login',
      role,
    };

    console.log('Login Payload:', payload);

    navigate('/verify', { state: payload });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e2e2e2] dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#0e0d1f] p-8 rounded-2xl shadow-lg relative">
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="absolute top-4 right-4 p-2 border rounded-full border-purple-700 hover:bg-purple-100 dark:hover:bg-[#1a1733] transition"
        >
          {isDark ? <FiSun className="text-purple-600" /> : <FiMoon className="text-purple-600" />}
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your details to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection Toggle */}
          <div className="flex gap-4">
            {(['donor', 'fundraiser'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold border transition ${
                  role === r
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#f0f0f0] dark:bg-[#15132b] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-[#2e2b4f]'
                }`}
              >
                {r === 'donor' ? 'Donate' : 'Fundraise'}
                <div className="text-[10px] font-normal">
                  {r === 'donor' ? 'Support causes' : 'Raise funds'}
                </div>
              </button>
            ))}
          </div>

          {/* Method Selection Toggle */}
          <div className="flex gap-4">
            {(['email', 'phone'] as Method[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${
                  method === m
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#f0f0f0] dark:bg-[#15132b] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#2e2b4f]'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          {/* Input Fields */}
          {method === 'email' ? (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
            />
          ) : (
            <div className="flex gap-2 w-[100%]">
              <select
                aria-label="State"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#f0f0f0] dark:bg-[#15132b] border w-[32%] border-gray-300 dark:border-[#2e2b4f] p-2 rounded-md text-sm text-gray-700 dark:text-gray-300"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.dial_code}>
                    {country.name} ({country.dial_code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm hover:opacity-90"
          >
            Send OTP
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-purple-500 font-semibold hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
