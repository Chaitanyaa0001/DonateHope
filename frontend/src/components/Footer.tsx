import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090821] text-white py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
                         10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 
                         0-8-3.59-8-8s3.59-8 8-8 8 3.59 
                         8 8-3.59 8-8 8z" />
              </svg>
            </div>
            <span className="text-xl font-bold">PulseWatch</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            AI-powered API monitoring platform for developers.  
            Stay ahead of downtime with smart alerts and insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-monitor">Add Monitor</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Contact</h3>
          <ul className="text-gray-300 text-sm space-y-3">
            <li>📧 support@pulsewatch.dev</li>
            <li>📞 +91-8901387298</li>
            <li>📍 Haryana, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Connect</h3>
          <div className="flex gap-4">
            <Link
              to="https://github.com/Chaitanyaa0001"
              target="_blank"
              className="hover:text-gray-200 text-2xl"
            >
              <FaGithub />
            </Link>
            <Link
              to="https://www.linkedin.com/in/chaitanya-khurana-077b702a0/"
              target="_blank"
              className="hover:text-blue-400 text-2xl"
            >
              <FaLinkedin />
            </Link>
            <Link
              to="https://x.com"
              target="_blank"
              className="hover:text-sky-400 text-2xl"
            >
              <FaTwitter />
            </Link>
            <Link
              to="https://pulsewatch.dev"
              target="_blank"
              className="hover:text-purple-400 text-2xl"
            >
              <FaGlobe />
            </Link>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            Follow us for dev updates, release logs, and insights.
          </p>
        </div>
      </div>

      <div className="text-center mt-12 text-gray-500 text-sm border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} PulseWatch. All rights reserved. | Privacy Policy | Terms of Use
      </div>
    </footer>
  );
};

export default Footer;
