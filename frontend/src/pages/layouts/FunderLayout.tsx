// src/layouts/FunderLayout.tsx
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const FunderLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar is fixed */}
      <Sidebar />

      {/* Page content */}
      <div className="flex-1 ml-64  min-h-screen p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default FunderLayout;
