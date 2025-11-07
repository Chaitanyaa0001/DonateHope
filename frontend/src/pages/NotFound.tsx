// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NotFoundImage from "../assets/NotFoundImage.png"; // Make sure to have a 404 image in assets

const NotFound: React.FC = () => {
  return (
    <div className="dark:bg-[#090821] bg-gray-50 min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center flex-grow px-6 py-12 text-center">
        
        <motion.img
          src={NotFoundImage}
          alt="Page Not Found"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-72 md:w-96 mb-8"
        />

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          404 — <span className="text-purple-500">Page Not Found</span>
        </motion.h1>

        <motion.p
          className="text-gray-700 dark:text-gray-300 text-lg mb-10 max-w-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Oops! The page you’re looking for doesn’t exist or might have been moved.  
          Don’t worry — you can always return to safety below !!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/"className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/30">Back to Home</Link>
          
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
