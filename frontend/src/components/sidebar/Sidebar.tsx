import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Post a Campaign", path: "/register", icon: <FiPlusCircle /> },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-[#0d0b1d] border-b border-gray-200 dark:border-gray-800 z-30 flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-[#9810FA]">DonateHope</h1>
        <button  onClick={() => setIsOpen(true)} className="text-2xl text-gray-700 dark:text-gray-300"> <FiMenu /></button>
      </div>

      <div className="hidden lg:flex h-screen w-64 bg-white dark:bg-[#0d0b1d] border-r border-gray-200 dark:border-gray-800 flex-col justify-between fixed left-0 top-0">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-[#9810FA]">DonateHope</h1>
        </div>
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${location.pathname === item.path? "bg-[#9810FA] text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{item.icon}{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 py-6 space-y-2 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/help"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiHelpCircle />
            Help Center
          </Link>
          <button
            type="button"
            onClick={() => console.log("Logout clicked")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 w-full text-left"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#0d0b1d] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between z-50"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-2xl font-bold text-[#9810FA]">DonateHope</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-700 dark:text-gray-300"
              >
                <FiX />
              </button>
            </div>

            <nav className="flex-1 px-4 mt-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        location.pathname === item.path
                          ? "bg-[#9810FA] text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="px-4 py-6 space-y-2 border-t border-gray-200 dark:border-gray-800">
              <Link
                to="/help"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiHelpCircle />
                Help Center
              </Link>
              <button
                onClick={() => {
                  console.log("Logout clicked");
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 w-full text-left"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Sidebar;