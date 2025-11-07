import { useMutation } from "@tanstack/react-query";
import { callAPI } from "@/CentralAPI/centralapi";

export const useAdminPasswordVerify = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await callAPI<{ message: string; accessToken: string; userId: string; role: "admin" },{ email: string; password: string }
      >({
        method: "post",
        url: "/api/admin/admin-login", 
        data: payload,
      });
      return res;
    },
  });
};
