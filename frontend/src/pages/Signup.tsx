import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { countries } from '@/utils/countries';

type Role = 'donor' | 'fundraiser';
type Method = 'email' | 'phone';

interface SignupFormState {
  fullName: string;
  role: Role;
  method: Method;
  email: string;
  phone: string;
  countryCode: string;
}

const Signup: React.FC = () => {
  const [form, setForm] = useState<SignupFormState>({
    fullName: '',
    role: 'donor',
    method: 'email',
    email: '',
    phone: '',
    countryCode: '+91',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: Role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const handleMethodChange = (method: Method) => {
    setForm((prev) => ({ ...prev, method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.fullName.trim()) return alert('Enter your full name');

    if (form.method === 'email' && !form.email.trim()) {
      return alert('Email is required');
    }

    if (form.method === 'phone' && !form.phone.trim()) {
      return alert('Phone number is required');
    }

    // Send to backend
    console.log('Form Data:', form);

    // Example: await axios.post('/api/signup', form)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
      <div className="bg-[#0e0d1f] p-8 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center">
            <FaUser className="text-2xl" />
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold mb-1">Join DonateHope</h2>
        <p className="text-center text-gray-400 mb-6 text-sm">Create your account to get started</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-[#15132b] border border-[#2e2b4f] mb-4 placeholder-gray-400 text-sm"
          />

          <p className="text-sm mb-2 text-gray-400">I want to:</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleRoleChange('donor')}
              className={`p-3 rounded-md border ${
                form.role === 'donor' ? 'border-purple-500 bg-[#1e1c38]' : 'border-[#2e2b4f]'
              }`}
            >
              <span className="block font-semibold">Donate</span>
              <span className="text-xs text-gray-400">Support causes</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('fundraiser')}
              className={`p-3 rounded-md border ${
                form.role === 'fundraiser' ? 'border-purple-500 bg-[#1e1c38]' : 'border-[#2e2b4f]'
              }`}
            >
              <span className="block font-semibold">Fundraise</span>
              <span className="text-xs text-gray-400">Raise funds</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleMethodChange('email')}
              className={`p-3 rounded-md text-sm font-semibold ${
                form.method === 'email' ? 'bg-purple-600' : 'bg-[#1e1c38]'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => handleMethodChange('phone')}
              className={`p-3 rounded-md text-sm font-semibold ${
                form.method === 'phone' ? 'bg-purple-600' : 'bg-[#1e1c38]'
              }`}
            >
              Phone
            </button>
          </div>

          {form.method === 'email' ? (
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#15132b] border border-[#2e2b4f] mb-4 placeholder-gray-400 text-sm"
            />
          ) : (
            <div className="flex gap-2 mb-4">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="bg-[#15132b] border border-[#2e2b4f] p-2 rounded-md text-sm text-gray-300"
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
                value={form.phone}
                onChange={handleChange}
                className="flex-1 p-3 rounded-md bg-[#15132b] border border-[#2e2b4f] placeholder-gray-400 text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-sm"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
