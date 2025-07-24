import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1e3a5f] z-50">
      <div className="relative">
        {/* Cat GIF */}
        <img
          src="/cat-loader.gif" 
          alt="Loading Cat"
          className="w-28 h-28 custom-spin"
        />
        {/* Loading text */}
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold">
          Loading
        </p>
      </div>

      {/* Inline animation CSS */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .custom-spin {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
