import React, { useState } from 'react';
import { useTheme } from '@/context/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';
import { countries } from '@/utils/countries';

type Method = 'email' | 'phone';

const Login: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const [method, setMethod] = useState<Method>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      method === 'email'
        ? { method, email }
        : { method, phone: `${countryCode}${phone}` };

    console.log('Login Payload:', payload);
    // Call your OTP API or password flow here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
      <div className="bg-[#0e0d1f] p-8 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="text-2xl hover:opacity-80 transition rounded-md cursor-pointer p-1 border-2 border-purple-600 dark:border-purple-900"
          >
            {isDark ? (
              <FiSun className="text-purple-600" />
            ) : (
              <FiMoon className="text-purple-600" />
            )}
          </button>
        </div>

        <h2 className="text-center text-2xl font-bold mb-1">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">Enter your details to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => setMethod('email')}
              className={`p-3 rounded-md text-sm font-semibold ${
                method === 'email' ? 'bg-purple-600' : 'bg-[#1e1c38]'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setMethod('phone')}
              className={`p-3 rounded-md text-sm font-semibold ${
                method === 'phone' ? 'bg-purple-600' : 'bg-[#1e1c38]'
              }`}
            >
              Phone
            </button>
          </div>

          {method === 'email' ? (
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-[#15132b] border border-[#2e2b4f] mb-4 placeholder-gray-400 text-sm"
              required
            />
          ) : (
            <div className="flex gap-2 mb-4">
              <select
                name="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-[#15132b] border border-[#2e2b4f] p-2 rounded-md text-sm text-gray-300"
                aria-label="Select country code"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.dial_code}>
                    {country.name} ({country.dial_code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 p-3 rounded-md bg-[#15132b] border border-[#2e2b4f] placeholder-gray-400 text-sm"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-sm"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-purple-400 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
