import React from 'react'
import Navbar from '../components/Navbar'

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Getstarted: React.FC = () => {
  const featureCards: FeatureCard[] = [
    {
      id: 1,
      title: "Make a Difference",
      description: "Support causes that matter to you and create positive impact in communities worldwide.",
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    },
    {
      id: 2,
      title: "Secure & Transparent",
      description: "Every donation is tracked and verified with complete transparency and security.",
      icon: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"
    },
    {
      id: 3,
      title: "Connect Communities",
      description: "Bring together donors and those in need through our trusted platform.",
      icon: "M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4M16 14C18.7 14 22 15.3 22 16V18H10V16C10 15.3 13.3 14 16 14M8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4M8 14C10.7 14 14 15.3 14 16V18H2V16C2 15.3 5.3 14 8 14Z"
    }
  ];

  return (
    <div>
      <Navbar/>
      <div className='dark:bg-[#090821] min-h-screen w-[95%] mx-auto px-4 py-8'>
        
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold text-black dark:text-white mb-6'>
            Empower Dreams Through <span className='text-purple-400'>Generosity</span>
          </h1>
          <p className='text-gray-800 dark:text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-8'>
            Join thousands of donors making a real difference. Support verified campaigns for medical aid, education, disaster relief, and community development.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button 
              type='button' 
              className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors'
            >
              Donate Now
            </button>
            <button 
              type='button' 
              className='bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors'
            >
              Start Fundraiser
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl md:text-4xl font-bold dark:text-white mb-4'>
            Why Choose <span className='text-purple-400'>DonateHope</span>?
          </h1>
          <p className='text-gray-700 text-lg dark:text-gray-300 max-w-2xl mx-auto mb-12'>
            We're committed to making charitable giving transparent, secure, and impactful.
          </p>
          
          {/* Feature Cards - Optimized with Map */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {featureCards.map((card) => (
              <div 
                key={card.id} 
                className='bg-[#1a1a2e] rounded-2xl p-8 text-center hover:bg-[#16213e] transition-colors'
              >
                <div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                  <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
                    <path d={card.icon}/>
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-white mb-4'>{card.title}</h3>
                <p className='text-gray-300 text-sm leading-relaxed'>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className='bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white mb-16 w-[100%]'>
          {/* Star Rating */}
          <div className='flex justify-center mb-6'>
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className='w-8 h-8 text-yellow-400 fill-current' 
                viewBox='0 0 24 24'
              >
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/>
              </svg>
            ))}
          </div>

          <h2 className='text-4xl md:text-5xl font-bold mb-6'>
            Ready to Make an Impact?
          </h2>
          <p className='text-lg md:text-xl mb-4 max-w-3xl mx-auto'>
            Join our community of generous donors and compassionate fundraisers.
          </p>
          <p className='text-base md:text-lg mb-8 max-w-2xl mx-auto opacity-90'>
            Every contribution counts, every story matters.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button 
              type='button' 
              className='bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors'
            >
              Explore Campaigns
            </button>
            <button 
              type='button' 
              className='bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors'
            >
              Join Our Mission
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-[#090821] text-white py-12 mt-8">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* DonateHope Logo & About */}
    <div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
        <a href="#" className="hover:text-pink-400 text-2xl"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-blue-400 text-2xl"><i className="fab fa-linkedin"></i></a>
        <a href="#" className="hover:text-white text-2xl"><i className="fab fa-github"></i></a>
        <a href="#" className="hover:text-green-400 text-2xl"><i className="fas fa-file-alt"></i></a>
      </div>
      <p className="mt-4 text-gray-400 text-sm">
        Stay connected for updates, causes & impact stories.
      </p>
    </div>

  </div>

  {/* Bottom Copyright */}
  <div className="text-center mt-12 text-gray-500 text-sm border-t border-gray-800 pt-6">
    © 2024 DonateHope. All rights reserved. | Privacy Policy | Terms of Service
  </div>
</footer>


    </div>
  )
}

export default Getstarted
