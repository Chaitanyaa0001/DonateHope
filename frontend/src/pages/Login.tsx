import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/useTheme';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic (e.g. API call)
    console.log('Logging in with', { email, password });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-[#030918] text-white' : 'bg-white text-black'}`}>
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800">
        {/* Theme Toggle Top Right */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="text-2xl p-1 rounded-[6px] border-2 border-purple-600 dark:border-purple-900"
          >
            {isDark ? <FiSun className="text-purple-500" /> : <FiMoon className="text-purple-600" />}
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7]">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-purple-300 dark:border-purple-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-purple-300 dark:border-purple-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-[#AF2BD9] to-[#8C36E7] hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
