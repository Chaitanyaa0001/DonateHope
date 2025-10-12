import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Getstarted from "./pages/Getstarted";
import Login from "@/pages/Login";
import Verify from "./pages/verificationotp/Verify";
import type { RootState } from "./redux/store";
import { useInitApp } from "./hooks/UseInitApp";

import CampignExplore from "./pages/donar/CampignExplore";
import Donate from "./pages/donar/Donate";
import FunderDashboard from "./pages/funder/FunderDashboard";
import RegisterCampign from "./pages/funder/RegisterCampign";
import MyCampaignDetails from "./pages/funder/MyCampaigns";

import ProtectedRoutes from "./protectedroutes/ProtectedRoute"; 
import FunderLayout from "./layouts/FunderLayout";
import DonorLayout from "./layouts/DonarLayout"; 

// Lazy-loaded pages
const PaymentHistory = lazy(() => import("@/pages/donar/PaymentHistory"));

const App = (): React.JSX.Element => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  useInitApp();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? "dark" : ""}`}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Getstarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />

        {/* Donor Protected Routes */}
        <Route element={<ProtectedRoutes role="donor"><DonorLayout /></ProtectedRoutes>}>
          <Route path="/explore" element={<CampignExplore />} />
          <Route path="/paymenthistory" element={
            <Suspense fallback={<div>Loading...</div>}>
              <PaymentHistory />
            </Suspense>
          } />
          <Route path="/paynment/:id" element={<Donate />} />
        </Route>

        {/* Funder Protected Routes */}
        <Route element={<ProtectedRoutes role="funder"><FunderLayout /></ProtectedRoutes>}>
          <Route path="/dashboard" element={<FunderDashboard />} />
          <Route path="/register" element={<RegisterCampign />} />
          <Route path="/my-campaigns/:id" element={<MyCampaignDetails />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div className="flex items-center justify-center min-h-screen text-xl">Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
