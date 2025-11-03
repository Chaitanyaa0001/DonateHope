import { useMonitors } from "@/hooks/monitors/useMonitor";
import React, { useState } from "react";

const RegisterMonitor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    endpoint: "",
    method: "GET",
    interval: 5,
    headers: "",
    body: "",
    file: null as File | null,
  });

  const { usePostMonitorMutation } = useMonitors();
  const { mutate: postMonitor } = usePostMonitorMutation;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let parsedHeaders = undefined;
      let parsedBody = undefined;
      if (formData.headers) {
        try {
          parsedHeaders = JSON.parse(formData.headers);
        } catch {
          alert("❌ Invalid JSON in headers");
          setIsSubmitting(false);
          return;
        }
      }
      if (formData.body) {
        try {
          parsedBody = JSON.parse(formData.body);
        } catch {
          alert("❌ Invalid JSON in body");
          setIsSubmitting(false);
          return;
        }
      }
      postMonitor(
        {
          name: formData.name,
          endpoint: formData.endpoint,
          method: formData.method,
          interval: formData.interval,
          headers: parsedHeaders,
          body: parsedBody,
          file: formData.file,
        },
        {
          onSuccess: () => {
            alert("✅ Monitor created successfully!");
            setFormData({
              name: "",
              endpoint: "",
              method: "GET",
              interval: 5,
              headers: "",
              body: "",
              file: null,
            });
          },
          onError: (error) => {
            console.error("❌ Error creating monitor:", error);
            alert("Failed to create monitor.");
          },
          onSettled: () => setIsSubmitting(false),
        }
      );
    } catch (error) {
      console.error(" Unexpected error:", error);
      alert("Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="w-full max-w-lg border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-center dark:text-white">
          Register New Monitor
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Monitor Name */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="API Health Monitor"
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Endpoint */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Endpoint URL</label>
            <input
              type="url"
              name="endpoint"
              value={formData.endpoint}
              onChange={handleChange}
              placeholder="https://api.example.com/health"
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Method */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Method</label>
            <select
            aria-label="state"
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* Interval */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Interval (seconds)</label>
            <input
            aria-label="state"
              type="number"
              name="interval"
              value={formData.interval}
              onChange={handleChange}
              min={1}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Headers */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Headers (JSON)</label>
            <textarea
              name="headers"
              value={formData.headers}
              onChange={handleChange}
              placeholder='{"Authorization": "Bearer token"}'
              rows={3}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Body (JSON)</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder='{"key": "value"}'
              rows={3}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium mb-1 dark:text-white">Upload File (optional)</label>
            <input
            aria-label="state"
              type="file"
              accept="*/*"
              onChange={handleFileChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md 
                         file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 
                         hover:file:bg-blue-100 dark:text-white"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 
                         transition duration-300 disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Monitor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterMonitor;
