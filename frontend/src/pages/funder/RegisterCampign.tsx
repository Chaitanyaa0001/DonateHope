import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Togglebutton from '@/components/ui/Togglebutton';
import type { Campaign } from '@/types/campign';

const RegisterCampaign: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Campaign, 'id' | 'raised' | 'donors' | 'daysLeft'>>({
    title: '',
    description: '',
    location: '',
    goal: 0,
    category: 'Medical',
    image: '',
    urgent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    // Your form handling logic here
  };

  return (
    <div className="">
      <div className="w-[90%] lg:w-[85%] mx-auto flex my-2 items-center justify-between">
        <Togglebutton />
        <button className="bg-green-500 text-white dark:text-black px-4 py-2 rounded-md">
          My Campaigns
        </button>
      </div>

      <div className="w-[90%] lg:w-[60%] mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register a New Fundraiser</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Campaign Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Flood Relief in Kerala"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Immediate relief for flood-affected families..."
              rows={4}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Kerala"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Goal Amount */}
          <div>
            <label className="block font-medium mb-1">Fundraising Goal (INR)</label>
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="1000000"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Disaster Relief">Disaster Relief</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Campaign Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Campaign
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterCampaign;
