// // src/pages/funder/MyCampaignDetails.tsx
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Togglebutton from "@/components/ui/Togglebutton";
// import { useCampaigns } from "@/hooks/campagin/useMonitor";
// import  type { CampaignData } from "@/responses/MonitorResponse";

// const MyCampaignDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const { useCampaignByIdQuery, useEditCampaignQuery, useDeleteCampaignQuery } = useCampaigns();
  
//   // Fetch campaign by ID
//   const { data: campaign, isLoading, isError } = useCampaignByIdQuery(id || "");

//   const editMutation = useEditCampaignQuery;
//   const deleteMutation = useDeleteCampaignQuery;

//   const [editableCampaign, setEditableCampaign] = useState<Partial<CampaignData>>({});

//   React.useEffect(() => {
//     if (campaign) {
//       setEditableCampaign({
//         title: campaign.title,
//         description: campaign.description,
//         goal: campaign.goal,
//         location: campaign.location,
//         category: campaign.category,
//       });
//     }
//   }, [campaign]);

//   if (isLoading)
//     return <div className="text-center mt-10 text-gray-500">Loading campaign...</div>;
//   if (isError || !campaign)
//     return <div className="text-center mt-10 text-red-500">Campaign not found</div>;

//   const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setEditableCampaign((prev) => ({
//       ...prev,
//       [name]: name === "goal" ? Number(value) : value,
//     }));
//   };

//   const handleSave = () => {
//     editMutation.mutate({ id: campaign._id, data: editableCampaign });
//     alert("Campaign updated successfully!");
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this campaign?")) {
//       deleteMutation.mutate(campaign._id, {
//         onSuccess: () => {
//           navigate("/dashboard");
//         },
//       });
//     }
//   };

//   return (
//     <div className="w-[90%] lg:w-[70%] mx-auto my-10">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
//         >
//           ← Back to Dashboard
//         </button>
//         <Togglebutton />
//       </div>

//       {/* Campaign Details */}
//       <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden p-6">
//         <img src={campaign.image} alt={campaign.title} className="w-full h-64 object-cover mb-4 rounded" />

//         <div className="flex flex-col gap-4">
//           <input
//             type="text"
//             name="title"
//             value={editableCampaign.title || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
//             placeholder="Campaign Title"
//           />

//           <textarea
//             name="description"
//             value={editableCampaign.description || ""}
//             onChange={handleChange}
//             rows={4}
//             className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
//             placeholder="Campaign Description"
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               name="goal"
//               value={editableCampaign.goal || 0}
//               onChange={handleChange}
//               className="p-2 border rounded dark:bg-gray-800 dark:text-white"
//               placeholder="Goal Amount"
//             />
//             <input
//               type="text"
//               name="location"
//               value={editableCampaign.location || ""}
//               onChange={handleChange}
//               className="p-2 border rounded dark:bg-gray-800 dark:text-white"
//               placeholder="Location"
//             />
//           </div>

//           <select
//           aria-label="state"
//             name="category"
//             value={editableCampaign.category || ""}
//             onChange={handleChange}
//             className="p-2 border rounded dark:bg-gray-800 dark:text-white"
//           >
//             <option value="">Select Category</option>
//             <option value="Medical">Medical</option>
//             <option value="Education">Education</option>
//             <option value="Disaster Relief">Disaster Relief</option>
//             <option value="Community">Community</option>
//             <option value="NGO">NGO</option>
//           </select>

//           {/* Progress */}
//           <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
//             <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               ₹{campaign.raised.toLocaleString()} raised of ₹{campaign.goal.toLocaleString()}
//             </p>
//             <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
//               <div className="h-3 bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Delete Campaign
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCampaignDetails;
