import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { countries } from '@/utils/countries'; // ⛔️ Not needed if phone is disabled
import Togglebutton from '@/components/ui/Togglebutton';
import { FiUser } from 'react-icons/fi';

type Method = 'email'; // ⛔️ Only allow email
type Role = 'donor' | 'fundraiser';

type FormData = {
  fullName: string;
  email: string;
  // phone: string;
  // countryCode: string;
  method: Method;
  role: Role;
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    // phone: '',
    // countryCode: '+91',
    method: 'email',
    role: 'donor',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const destination = formData.email;

    navigate('/verify', {
      state: {
        method: formData.method,
        destination,
        context: 'signup',
        role: formData.role,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e2e2e2] dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] text-black dark:text-white px-4">
      <div className="bg-white dark:bg-[#0e0d1f] p-8 rounded-2xl w-full max-w-md shadow-xl relative">
        <Togglebutton />
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
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-purple-500 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
            required
          />

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

          {/* Email only – Phone commented out */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
            required
          />

          {/*
          // 🔒 Phone fields disabled for now:
          <div className="flex gap-2 w-full">
            <select
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
              className="flex-1 p-3 rounded-md bg-[#f0f0f0] dark:bg-[#15132b] border border-gray-300 dark:border-[#2e2b4f] placeholder-gray-500 dark:placeholder-gray-400 text-sm text-black dark:text-white"
              required
            />
          </div>
          */}

          <button
            type="submit"
            className="w-full p-3 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm hover:opacity-90"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
