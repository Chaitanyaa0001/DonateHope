import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface PaymentModalProps {
  amount: string;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 20, stiffness: 300 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    upi: '',
    note: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    console.log('Processing Payment:', {
      ...formData,
      amount,
    });

    alert('✅ Payment processed successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="relative bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl w-[90%] max-w-md p-6"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl transition-transform hover:scale-110"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold mb-5 text-purple-600 dark:text-white text-center">
            Payment Details
          </h2>

          

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="upi"
              placeholder="UPI ID (e.g. yourname@upi)"
              value={formData.upi}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              placeholder="0"
              value={`₹${amount}`}
              disabled
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-center font-semibold dark:text-white"
            />

            <textarea
              name="note"
              placeholder="Add a note (optional)"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 rounded-md font-semibold transition"
            >
              💸 Pay Now
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
