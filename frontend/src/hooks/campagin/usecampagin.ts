import { useState } from "react";
import { callAPI } from "../../CentralAPI/centralapi";
import type { CampaignData } from "@/responses/campaign";
import  type { NewCampaignData } from "@/types/campign";



export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  
  const getAllCampaigns = async () => {
    const data = await callAPI<CampaignData[]>({ method: "get", url: "/campaigns" });
    setCampaigns(data);
    return data;
  };

  
  const getMyCampaigns = async () => {
    const data = await callAPI<CampaignData[]>({ method: "get", url: "/campaigns/my" });
    setCampaigns(data);
    return data;
  };

  
  const getCampaignById = async (id: string) => {
    const data = await callAPI<CampaignData>({ method: "get", url: `/campaigns/${id}` });
    return data;
  };

  
  const postCampaign = async (data : NewCampaignData) => {
   const formData = new FormData ();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("goal", String(data.goal));
      formData.append("category", data.category);
      formData.append("urgent", String(data.urgent));

      if (data.image) formData.append("image", data.image);


    const newCampaign = await callAPI<CampaignData, FormData>({ method: "post",url: "/campaigns",data: formData,});
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const editCampaign = async (id: string, updatedData: Partial<CampaignData>) => {
    const updatedCampaign = await callAPI<CampaignData, Partial<CampaignData>>({
      method: "put",
      url: `/campaigns/${id}`,
      data: updatedData,
    });
    setCampaigns(prev => prev.map(c => (c._id === id ? updatedCampaign : c)));
    return updatedCampaign;
  };

  const deleteCampaign = async (id: string) => {
    await callAPI<void>({ method: "delete", url: `/campaigns/${id}` });
    setCampaigns(prev => prev.filter(c => c._id !== id));
  };

  return {
    campaigns,
    getAllCampaigns,
    getMyCampaigns,
    getCampaignById,
    postCampaign,
    editCampaign,
    deleteCampaign,
  };
};
