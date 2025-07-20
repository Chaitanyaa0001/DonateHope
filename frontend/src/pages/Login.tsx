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

  };

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw] '>
      <button
        type="button"
        onClick={toggleTheme}
        className="text-2xl hover:opacity-80 transition rounded-[6px]   cursor-pointer bg p-1 mr-2 border-2 border-purple-600 dark:border-purple-900 "

      >
        {isDark ? <FiSun className='text-purple-600' /> : <FiMoon className='text-purple-600' />}
      </button>

      <div>
        <h1>Welcome Back</h1>
        <p>Enter your details to continue</p>

        <form onSubmit={handleSubmit}>
          <div>
            <button
              type="button"
              onClick={() => setMethod('email')}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setMethod('phone')}
            >
              Phone
            </button>
          </div>

          {method === 'email' ? (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          ) : (
            <div>
              <select
                aria-label="Select country code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countries.map((country)=>{
                  return <option key={country.code} value={country.dial_code}>
                            {country.name} ({country.dial_code})
                         </option>
                })};
              </select>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
