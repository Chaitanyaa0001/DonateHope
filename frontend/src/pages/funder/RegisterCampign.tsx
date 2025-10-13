import React, { useState } from "react";
import { useCampaigns } from "@/hooks/campagin/usecampagin";
import type { Campaign } from "@/types/campign";

const RegisterCampaign: React.FC = () => {
  const { usePostCampaignQuery } = useCampaigns();
  const { mutateAsync: postCampaign, isPending } = usePostCampaignQuery;

  // 🖼️ Image file state
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 🧩 Form data state
  const [formData, setFormData] = useState<Omit<Campaign, "id" | "raised" | "donors">>({
    title: "",
    description: "",
    location: "",
    goal: 0,
    category: "Medical",
    image: "",
    urgent: false,
  });

  // ✅ Handle text, number, select, checkbox inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, type, value } = target;

    // Safely determine input value type
    let fieldValue: string | number | boolean = value;
    if (type === "checkbox") {
      fieldValue = (target as HTMLInputElement).checked;
    } else if (type === "number") {
      fieldValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
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
        image: previewUrl, // for preview only
      }));
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    try {
      const campaignData = {
        ...formData,
        image: imageFile, // pass actual file to backend
      };

      await postCampaign(campaignData);
      alert("✅ Campaign created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        goal: 0,
        category: "Medical",
        image: "",
        urgent: false,
      });
      setImageFile(null);
    } catch (error) {
      console.error("❌ Error creating campaign:", error);
      alert("Something went wrong while creating the campaign.");
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-lg border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
          Register New Campaign
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Flood Relief in Kerala"
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Immediate relief for flood-affected families..."
              rows={4}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Kerala"
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Goal (INR)</label>
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="1000000"
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Category</label>
            <select
            aria-label="state"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            >
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Disaster Relief">Disaster Relief</option>
            </select>
          </div>

          {/* Urgent */}
          <div className="flex items-center gap-2">
            <input
            aria-label="state"
              type="checkbox"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
            />
            <label className="dark:text-white">Mark as Urgent</label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Campaign Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md 
                         file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 
                         hover:file:bg-blue-100 dark:text-white"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-3 w-32 rounded-md border dark:border-gray-700"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 
                         transition duration-300 disabled:opacity-70"
            >
              {isPending ? "Submitting..." : "Submit Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCampaign;
