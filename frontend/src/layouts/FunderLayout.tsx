
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const FunderLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64  min-h-screen p-3 lg:p-6">
        <Outlet /> 
      </div>
    </div>
    
  );
};

export default FunderLayout;
