import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

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
import UserDetails from "./pages/admin/UserDetails";
import NotFound from "./pages/NotFound";


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

        {/* user Protected Routes */}
        <Route element={<ProtectedRoutes role="user"><DonorLayout /></ProtectedRoutes>}>
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/user/add-monitor" element={<RegisterMonitor/>} />
          <Route path="/user/monitor/:id" element={<MonitorDetails/>} />

        </Route>

        {/* admin Protected Routes */}
        <Route element={<ProtectedRoutes role="admin"><FunderLayout /></ProtectedRoutes>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/user/:id" element={<UserDetails />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick theme={isDark ? "dark" : "light"}pauseOnHover/>
    </div>
  );
};

export default App;
