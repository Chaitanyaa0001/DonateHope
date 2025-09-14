import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Getstarted from "./pages/Getstarted";
import Login from "@/pages/Login";
import type { RootState } from "./redux/store";
import { useInitApp } from "./hooks/UseInitApp";
import CampignExplore from "./pages/donar/CampignExplore";
import Verify from "./pages/verificationotp/Verify";
import FunderDashboard from "./pages/funder/FunderDashboard";
import RegisterCampign from "./pages/funder/RegisterCampign";
import Donate from "./pages/donar/Donate";
import MyCampaignDetails from "./pages/funder/MyCampaigns";
import ProtectedRoutes from "./protectedroutes/ProtectedRoute"; 

const PaymentHistory = lazy(() => import("@/pages/donar/PaymentHistory"));

const App = (): React.JSX.Element => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  useInitApp();

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "dark" : ""
      }`}
    >
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Getstarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />

        {/* Donar protected routes */}
        <Route
          path="/campaigns"
          element={
            <ProtectedRoutes role="donor">
              <CampignExplore />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/paynment/:id"
          element={
            <ProtectedRoutes role="donor">
              <Donate />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/paymenthistory"
          element={
            <ProtectedRoutes role="donor">
              <Suspense fallback={<div>Loading...</div>}>
                <PaymentHistory />
              </Suspense>
            </ProtectedRoutes>
          }
        />

        {/* Funder protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes role="funder">
              <FunderDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoutes role="funder">
              <RegisterCampign />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/my-campaigns/:id"
          element={
            <ProtectedRoutes role="funder">
              <MyCampaignDetails />
            </ProtectedRoutes>
          }
        />

        {/* Catch-all route (404) */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
