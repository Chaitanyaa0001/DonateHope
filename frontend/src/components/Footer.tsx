import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090821] text-white py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5
                         2.09C13.09 3.81 14.76 3 16.5 3 19.58 3
                         22 5.42 22 8.5c0 3.78-3.4 6.86-8.55
                         11.54L12 21.35z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">DonateHope</span>
          </div>
          <p className="text-gray-400 text-sm">
            Making the world a better place, one donation at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Campaigns</a></li>
            <li><a href="#">Donate</a></li>
            <li><a href="#">Start Fundraiser</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Get in Touch</h3>
          <ul className="text-gray-300 text-sm space-y-3">
            <li>📧 Chaitanyakhurana.workk@gmail.com</li>
            <li>📞 +91-8901387298</li>
            <li>📍 Haryana, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/chaitanya._001" className="hover:text-pink-400 text-2xl"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/chaitanya-khurana-077b702a0/" className="hover:text-blue-400 text-2xl"><FaLinkedin /></a>
            <a href="https://github.com/Chaitanyaa0001" className="hover:text-white text-2xl"><FaGithub /></a>
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            Stay connected for updates, causes & impact stories.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-12 text-gray-500 text-sm border-t border-gray-800 pt-6">
        © 2024 DonateHope. All rights reserved. | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
};

export default Footer;
