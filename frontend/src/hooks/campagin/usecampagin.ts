
import { callAPI } from "../../CentralAPI/centralapi";
import type { CampaignData } from "@/responses/campaign";
import  type { NewCampaignData } from "../../responses/campaign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const campaignKeys = {
  all: ["campaigns"] as const,
  my: ["campaigns", "my"] as const,
  detail: (id: string) => ["campaign", id] as const,
}

export const useCampaigns = () => {

  const queryclient = useQueryClient();

  const useAllCampaignsQuery = useQuery ({
    queryKey: campaignKeys.all,
    queryFn: async () => {
      return await callAPI<CampaignData[]>({method: "get" , url : "/campaigns"});
    }
  });

 
  const useMyCampaignQuery = useQuery ({
    queryKey: campaignKeys.my,
    queryFn:   async () => {
      return await callAPI<CampaignData[]>({method: "get" , url : "/campaigns/my"})}
  });

  const useCampaignByIdQuery = (id: string) =>
  useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: async () => {
      return await callAPI<CampaignData>({
        method: "get",
        url: `/campaigns/${id}`,
      });
    },
    enabled: !!id, 
  });


  
  const usePostCampaignQuery  = useMutation({
    mutationFn: async (data: NewCampaignData) =>{
      const formData   = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("goal", String(data.goal));
      formData.append("category", data.category);
      formData.append("urgent", String(data.urgent));
      if (data.image) formData.append("image", data.image);

      return await callAPI<CampaignData, FormData>({
        method:"post", url : "/campaigns", data: formData
      });
    },

    onSuccess: () =>{
      queryclient.invalidateQueries({queryKey: campaignKeys.all});
    }
  })

  const useEditCampaignQuery = useMutation({
    mutationFn: async ({id,data,}:{id:string,data: Partial<CampaignData>;}) =>{
      return await callAPI<CampaignData, Partial<CampaignData>>({
        method : "put", url : `/campaigns/${id}`, data
      });
    },
        onSuccess: (_, variables) => {
      //  Refresh specific campaign and the list
      queryclient.invalidateQueries({
        queryKey: campaignKeys.detail(variables.id),
      });
      queryclient.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });

 

  const useDeleteCampaignQuery =  useMutation({
    mutationFn: async (id: string) =>{
      await callAPI({method: "delete" , url : `/campaigns/${id}`})
    },
   onSuccess : () =>{
    queryclient.invalidateQueries ({queryKey : campaignKeys.all})
   } 
  })

  return {
    useAllCampaignsQuery,
    useMyCampaignQuery,
    useCampaignByIdQuery,
    usePostCampaignQuery,
    useEditCampaignQuery,
    useDeleteCampaignQuery,
  };
};
