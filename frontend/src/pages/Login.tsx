import React, { useState } from 'react'
import { useTheme } from '@/context/useTheme';
import { FiSun,FiMoon } from 'react-icons/fi';

type Method = 'email' | 'phone';

const Login: React.FC   = () => {
    const { isDark, toggleTheme } = useTheme();
    const [method, setmethod] = useState<Method>('email')
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [countrycode, setcountrycode] = useState('91+')

    const handlesumbit = (e:React.FormEvent) =>{
      e.preventDefault();

      const payload = method === 'email' ? {method,email} : {method,phone: `${countrycode}`}
      console.log(payload);
      
    }
  
  return (
    <div>
      <button type="button" onClick={toggleTheme} className="text-2xl hover:opacity-80 transition rounded-[6px] cursor-pointer bg p-1 mr-2 border-2 border-purple-600 dark:border-purple-900 ">
          {isDark ? <FiSun className='text-purple-600'/> : <FiMoon className='text-purple-600'/>}
        </button>
      <div>
        <h1>Welcome Back</h1>
        <p>Enter your details to continue</p>
        <form action="" onClick={handlesumbit}>
             <button
              type="button"
              onClick={() => setmethod('email')}
              className={`p-3 rounded-md text-sm font-semibold ${
                method === 'email' ? 'bg-purple-600' : 'bg-[#1e1c38]'
              }`}
            >
              Email
            </button>
          <input type="text" name='' value={} placeholder='Enter your' />
        </form>

      </div>
    </div>
  )
}

export default Login