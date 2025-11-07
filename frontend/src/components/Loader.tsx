// src/components/Loader.tsx
import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[#090821] bg-gray-50">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Glowing Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-b-purple-500 shadow-[0_0_25px_4px_rgba(139,92,246,0.5)]"></div>

        <motion.div
          className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-purple-500 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_6px_rgba(139,92,246,0.4)]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;
