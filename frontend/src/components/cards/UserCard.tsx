import React from "react";
import { motion, easeOut } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiCalendar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
  };
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="rounded-2xl border border-[#C800DE]/50 hover:border-[#C800DE] transition-all duration-300 bg-white dark:bg-[#0d0b1d] hover:shadow-[0_0_25px_rgba(200,0,222,0.4)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-purple-400">
          {user.fullname}
        </h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            user.role === "admin"
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          }`}
        >
          {user.role.toUpperCase()}
        </span>
      </div>

      {/* Details */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
        <p className="flex items-center gap-2 text-sm">
          <FiMail className="text-purple-500 dark:text-purple-400" /> {user.email}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FiCalendar className="text-purple-500 dark:text-purple-400" /> Joined:{" "}
          {user.createdAt}
        </p>

        <p
          className={`flex items-center gap-2 text-sm ${
            user.isVerified
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {user.isVerified ? <FiCheckCircle /> : <FiXCircle />}
          {user.isVerified ? "Verified" : "Not Verified"}
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FiUser className="text-purple-500 dark:text-purple-400" /> ID:{" "}
          {user._id.slice(-6)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-5 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#141124]">
        <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">
          User Management
        </h3>
        <div className="flex gap-3">
            <Link to={`/admin/user/${user._id}`}>
          <button
            onClick={() => console.log(`View user ${user._id}`)}
            className="px-3 py-1.5 text-sm font-semibold rounded-md bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:from-purple-600 hover:to-fuchsia-700 transition-all"
          >
            View
          </button>
          </Link>
          <button
            onClick={() => onDelete(user._id)}
            className="px-3 py-1.5 text-sm font-semibold rounded-md bg-red-500/80 text-white hover:bg-red-600 transition-all flex items-center gap-1"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
