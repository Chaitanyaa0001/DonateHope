import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const GetStarted: React.FC = () => {
  const featureCards: FeatureCard[] = [
    {
      id: 1,
      title: "Real-Time API Monitoring",
      description:
        "Track your APIs with live uptime, latency, and error response insights. Never miss a failure again.",
      icon: "M13 2H11V10H13M12 14C10.34 14 9 15.34 9 17S10.34 20 12 20 15 18.66 15 17 13.66 14 12 14Z",
    },
    {
      id: 2,
      title: "AI Log Analyzer",
      description:
        "Get intelligent insights powered by AI that explain API failures and suggest possible fixes instantly.",
      icon: "M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M7 9H9V11H7V9M11 9H13V11H11V9M15 9H17V11H15V9M7 13H9V15H7V13M11 13H13V15H11V13M15 13H17V15H15V13Z",
    },
    {
      id: 3,
      title: "API Performance Score",
      description:
        "Analyze API health with a performance score out of 100, based on uptime, latency, and stability trends.",
      icon: "M12 3C7.03 3 3 7.03 3 12H5C5 8.13 8.13 5 12 5S19 8.13 19 12H21C21 7.03 16.97 3 12 3M11 12V17H13V12H11M11 7V10H13V7H11Z",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="dark:bg-[#090821] min-h-screen w-[95%] mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Monitor APIs with <span className="text-purple-400">AI Precision</span>
          </h1>
          <p className="text-gray-800 dark:text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-8">
            PulseWatch helps developers monitor, analyze, and optimize their APIs using real-time data
            and AI-powered insights. Stay ahead of downtime and ensure your APIs perform flawlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Monitoring
            </button>
            <button
              type="button"
              className="bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">
            Why Choose <span className="text-purple-400">PulseWatch</span>?
          </h1>
          <p className="text-gray-700 text-lg dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Built for developers who care about reliability, performance, and actionable insights.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featureCards.map((card) => (
              <div
                key={card.id}
                className="bg-[#1a1a2e] rounded-2xl p-8 text-center hover:bg-[#16213e] transition-colors"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={card.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white mb-16 w-[100%]">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Monitor Smarter?
          </h2>
          <p className="text-lg md:text-xl mb-4 max-w-3xl mx-auto">
            Start tracking your APIs in minutes and let AI handle the rest.
          </p>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto opacity-90">
            PulseWatch — your reliable partner for uptime, insights, and performance analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              type="button"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Add API Monitor
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;
