import React, { useState } from 'react';
import Togglebutton from '@/components/ui/Togglebutton';
import type { Campaign } from '@/types/campign';
import Sidebar from '@/components/sidebar/Sidebar';
import formImage from '@/assets/image.png'; // ✅ React import for static image

const RegisterCampaign: React.FC = () => {
  const [formData, setFormData] = useState<
    Omit<Campaign, 'id' | 'raised' | 'donors' | 'daysLeft'>
  >({
    title: '',
    description: '',
    location: '',
    goal: 0,
    category: 'Medical',
    image: '',
    urgent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'goal' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Sidebar />
      <div className="relative">
        <div className="w-[90%]  lg:w-[75%] flex my-4 items-center justify-between">
          <Togglebutton />
        </div>

        {/* Wrapper with relative positioning */}
        <div className="w-[90%] lg:w-[90%]  my-8 relative flex justify-center">
          {/* Decorative Image Behind Form */}
          <div className="absolute -top-9 -right-30 hidden lg:block">
            <img
              src={formImage}
              alt="Campaign Illustration"
              className="w-72 opacity-80 rotate-8 rounded-xl shadow-lg"
            />
          </div>

          {/* Form */}
          <div className="relative z-10 w-full lg:w-[85%] border-2 border-purple-500 
                          bg-white/90 dark:bg-gray-900/90 backdrop-blur-md 
                          p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
              Register a New Fundraiser
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Campaign Title */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">
                  Campaign Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Flood Relief in Kerala"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                             dark:bg-gray-800 dark:text-white dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Immediate relief for flood-affected families..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                             dark:bg-gray-800 dark:text-white dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                ></textarea>
              </div>

              {/* Location */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Kerala"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                             dark:bg-gray-800 dark:text-white dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Goal */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">
                  Fundraising Goal (INR)
                </label>
                <input
                  type="number"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  placeholder="1000000"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                             dark:bg-gray-800 dark:text-white dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">
                  Category
                </label>
                <select
                  aria-label="State"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                             dark:bg-gray-800 dark:text-white dark:border-gray-600"
                >
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                </select>
              </div>

              {/* Upload Image */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">
                  Campaign Image
                </label>
                <input
                  placeholder="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm 
                             file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                             dark:text-white"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Submit Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCampaign;
