import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Getstarted from './pages/Getstarted';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Signupverify from './components/verificationotp/verify';
import type { RootState } from './redux/store';
import { useInitApp } from './hooks/UseInitApp';
import CampignExplore from './pages/donar/CampignExplore';
import FunderDashboard from './pages/funder/FunderDashboard';
import RegisterCampign from './pages/funder/RegisterCampign';
import Donate from './pages/donar/Donate';
import MyCampaignDetails from './pages/funder/Mycampaigns';


const PaymentHistory = lazy(()=> import('@/pages/donar/PaymentHistory')) ;

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
        {/* donar  */}
        <Route path="/campaigns" element={<CampignExplore />}/>
        <Route path='/paynment/:id' element ={<Suspense><Donate/></Suspense>}/>
        <Route path='/paymenthistory' element={<PaymentHistory/>}/>
  
        <Route path='/dashboard' element = {<FunderDashboard/>}/>
        <Route path='/register' element={<RegisterCampign/>}/>
        <Route path="/my-campaigns/:id" element={<MyCampaignDetails />} />

      </Routes>
    </div>
  );
};

export default App;
