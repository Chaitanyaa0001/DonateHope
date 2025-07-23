// src/pages/donar/PaymentHistory.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Togglebutton from '@/components/ui/Togglebutton';
import Footer from '@/components/Footer';
import dummyImage from '@/assets/dummy.jpg'; // update path if needed

const dummyPayments = [
  { id: 1, campaign: 'Baby Arya Surgery', amount: '₹500', date: '2025-07-21', status: 'Success', image: dummyImage },
  { id: 2, campaign: 'Tribal Education Fund', amount: '₹250', date: '2025-07-18', status: 'Success', image: dummyImage },
  { id: 3, campaign: 'Kerala Flood Relief', amount: '₹1000', date: '2025-07-10', status: 'Success', image: dummyImage },
];

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <div className="w-[90%] sm:w-[85%] mx-auto my-8 flex justify-between items-center">
        <Togglebutton />
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-white">
          Your Payment History
        </h1>
      </div>

      {/* Back Button */}
      <div className="w-[90%] sm:w-[85%] mx-auto mb-4">
        <button
          onClick={() => navigate('/campaigns')}
          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-md shadow-sm hover:scale-105 transition font-medium"
        >
          ← Back to Campaigns
        </button>
      </div>

      {/* Payment Cards */}
      <div className="w-[90%] sm:w-[85%] mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {dummyPayments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-md overflow-hidden transition hover:scale-[1.02]"
          >
            <img src={payment.image} alt={payment.campaign} className="w-full h-48 object-cover" />

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-purple-700 dark:text-white">
                {payment.campaign}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Amount:</strong> {payment.amount}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Date:</strong> {payment.date}
              </p>
              <p>
                <span className="inline-block bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                  {payment.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PaymentHistory;
