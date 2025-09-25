import { useState } from "react";
import { callAPI } from "../../CentralAPI/centralapi";
import type { CampaignData } from "@/responses/campaign";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  
  const getAllCampaigns = async () => {
    const data = await callAPI<CampaignData[]>({ method: "get", url: "/campagins" });
    setCampaigns(data);
    return data;
  };

  
  const getMyCampaigns = async () => {
    const data = await callAPI<CampaignData[]>({ method: "get", url: "/campagins/my" });
    setCampaigns(data);
    return data;
  };

  
  const getCampaignById = async (id: string) => {
    const data = await callAPI<CampaignData>({ method: "get", url: `/campagins/${id}` });
    return data;
  };

  
  const postCampaign = async (formData: FormData) => {
    const newCampaign = await callAPI<CampaignData, FormData>({ method: "post",url: "/campagins",data: formData,});
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const editCampaign = async (id: string, updatedData: Partial<CampaignData>) => {
    const updatedCampaign = await callAPI<CampaignData, Partial<CampaignData>>({
      method: "put",
      url: `/campagins/${id}`,
      data: updatedData,
    });
    setCampaigns(prev => prev.map(c => (c.id === id ? updatedCampaign : c)));
    return updatedCampaign;
  };

  const deleteCampaign = async (id: string) => {
    await callAPI<void>({ method: "delete", url: `/campagins/${id}` });
    setCampaigns(prev => prev.filter(c => c.id !== id));
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
