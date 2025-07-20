import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Getstarted from './pages/Getstarted';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Signupverify from './components/verificationotp/verify';
import type { RootState } from './redux/store';
import { useInitApp } from './hooks/UseInitApp';

const App = (): React.JSX.Element => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  useInitApp();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark' : ''}`}>
      <Routes>
        <Route path="/" element={<Getstarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Signupverify />} />
      </Routes>
    </div>
  );
};

export default App;
