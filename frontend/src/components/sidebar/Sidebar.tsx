import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiPlusCircle, FiHelpCircle, FiLogOut } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Post a Campaign", path: "/register", icon: <FiPlusCircle /> },
  ];

  return (
    <div className="h-screen w-64 bg-white dark:bg-[#0d0b1d] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between fixed left-0 top-0">
      
      {/* Logo */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-[#9810FA]">DonateHope</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
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

      {/* Bottom Section */}
      <div className="px-4 py-6 space-y-2 border-t border-gray-200 dark:border-gray-800">
        <Link
          to="/help"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FiHelpCircle />
          Help Center
        </Link>

        <button
          onClick={() => console.log("Logout clicked")}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 w-full text-left"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
