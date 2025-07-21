import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from '@/utils/countries';
import { FiSun, FiMoon, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { toggleTheme } from '@/redux/themeSlice';

type Method = 'email' | 'phone';
type Role = 'donor' | 'fundraiser';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  method: Method;
  role: Role;
};

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state:RootState)=> state.theme.isDark);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    method: 'email',
    role: 'donor',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const destination =
      formData.method === 'email'
        ? formData.email
        : `${formData.countryCode}${formData.phone}`;

    // Navigate to OTP verification with context: 'signup'
    navigate('/verify', {
      state: {
        method: formData.method,
        destination,
        context: 'signup',
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e2e2e2] dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] text-black dark:text-white px-4">
      <div className="bg-white dark:bg-[#0e0d1f] p-8 rounded-2xl w-full max-w-md shadow-xl relative">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="absolute top-4 right-4 p-2 border rounded-full border-purple-700 hover:bg-purple-100 dark:hover:bg-[#1a1733] transition"
        >
          {isDark ? <FiSun className="text-purple-500" /> : <FiMoon className="text-purple-500" />}
        </button>

        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-600 p-3 rounded-xl">
            <FiUser size={28} />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold mb-1">
          Join <span className="text-purple-400">DonateHope</span>
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-purple-500 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
            required
          />

          {/* Role Toggle */}
          <div className="flex gap-4">
            {(['donor', 'fundraiser'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                className={`flex-1 py-3 rounded-md text-sm font-semibold border transition ${
                  formData.role === r
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

          {/* Method Toggle */}
          <div className="flex gap-4">
            {(['email', 'phone'] as Method[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, method: m }))}
                className={`flex-1 py-3 rounded-md text-sm font-semibold transition ${
                  formData.method === m
                    ? 'bg-purple-500 text-white'
                    : 'bg-[#f0f0f0] dark:bg-[#15132b] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#2e2b4f]'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          {/* Email / Phone Input */}
          {formData.method === 'email' ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
              required
            />
          ) : (
            <div className="flex gap-2 w-[100%]">
              <select
              aria-label='State'
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="bg-[#f0f0f0] w-[32%] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] p-2 rounded-md text-sm text-gray-700 dark:text-gray-300"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.dial_code}>
                    {c.name} ({c.dial_code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="flex-1 p-3  rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-purple-500 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
