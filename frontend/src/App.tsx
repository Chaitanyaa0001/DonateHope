import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Getstarted from "./pages/Getstarted";
import Login from "@/pages/Login";
import Verify from "./pages/verificationotp/Verify";
import type { RootState } from "./redux/store";
import { useInitApp } from "./hooks/UseInitApp";



import ProtectedRoutes from "./protectedroutes/ProtectedRoute"; 
import FunderLayout from "./layouts/FunderLayout";
import DonorLayout from "./layouts/DonarLayout"; 
import AdminDashboard from "./pages/admin/AdminDashBoard";
import UserDashboard from "./pages/user/userDashboard";
import RegisterMonitor from "./pages/user/RegisterMonitor";
import MonitorDetails from "./pages/user/MonitorDetails";

// Lazy-loaded pages

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
        <Route element={<ProtectedRoutes role="user"><DonorLayout /></ProtectedRoutes>}>
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/user/monitor/:id" element={<MonitorDetails/>} />
          <Route path="/user/add-monitor" element={<RegisterMonitor/>} />
          <Route path="/user/add-monitor" element={<RegisterMonitor/>} />

        </Route>

        {/* Funder Protected Routes */}
        <Route element={<ProtectedRoutes role="admin"><FunderLayout /></ProtectedRoutes>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div className="flex items-center justify-center min-h-screen text-xl">Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
