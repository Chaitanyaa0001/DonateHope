import React, { useState } from 'react';
import Togglebutton from '@/components/ui/Togglebutton';
import type { Campaign } from '@/types/campign';
import Sidebar from '@/components/sidebar/Sidebar';
import formImage from '@/assets/image.png';
import { useCampaigns } from '@/hooks/campagin/usecampagin';

const RegisterCampaign: React.FC = () => {
  const { postCampaign } = useCampaigns();

  // We’ll keep both: a file (for upload) and a preview URL (for UI)
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  // ✅ Handle text/number/select inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'goal' ? Number(value) : value,
    }));
  };

  // ✅ Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: previewUrl, // just for preview
      }));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!imageFile) {
        alert('Please upload a campaign image.');
        return;
      }

      const campaignData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        goal: formData.goal,
        category: formData.category,
        urgent: formData.urgent,
        image: imageFile, // must be File
      };

      const result = await postCampaign(campaignData);
      console.log('✅ Campaign created:', result);
      alert('Campaign created successfully!');
    } catch (error) {
      console.error('❌ Error creating campaign:', error);
      alert('Something went wrong while creating the campaign.');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="relative">
        <div className="w-[90%] lg:w-[75%] flex my-4 items-center justify-between">
          <Togglebutton />
        </div>

        <div className="w-[90%] lg:w-[90%] my-8 relative flex justify-center">
          <div className="absolute -top-9 -right-30 hidden lg:block">
            <img
              src={formImage}
              alt="Campaign Illustration"
              className="w-72 opacity-80 rotate-8 rounded-xl shadow-lg"
            />
          </div>

          <div className="relative z-10 w-full lg:w-[85%] border-2 border-purple-500 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
              Register a New Fundraiser
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* title */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">Campaign Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Flood Relief in Kerala"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              </div>

              {/* description */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Immediate relief for flood-affected families..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                ></textarea>
              </div>

              {/* location */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Kerala"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* goal */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">Goal (INR)</label>
                <input
                  type="number"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  placeholder="1000000"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* category */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">Category</label>
                <select
                aria-label='state'
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                </select>
              </div>

              {/* image */}
              <div>
                <label className="block font-medium mb-1 dark:text-white">Campaign Image</label>
                <input
                aria-label='state'
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm 
                             file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                             dark:text-white"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-3 w-32 rounded-md" />
                )}
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
