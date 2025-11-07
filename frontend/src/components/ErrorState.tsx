import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onActionClick?: () => void;
  imageUrl?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We couldn’t load your data right now. Please try again later.",
  actionText,
  onActionClick,
  imageUrl = "https://illustrations.popsy.co/violet/server-down.svg",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] dark:bg-[#090821] bg-gray-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Error" className="w-40 h-40 object-contain opacity-90" />
        ) : (
          <AlertTriangle className="w-16 h-16 text-purple-500" />
        )}
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-gray-600 dark:text-gray-400 max-w-md mb-6"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {message}
      </motion.p>

      {actionText && onActionClick && (
        <motion.button
          onClick={onActionClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-purple-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {actionText}
        </motion.button>
      )}
    </div>
  );
};

export default ErrorState;
