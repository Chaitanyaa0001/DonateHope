// src/hooks/userAdmin/useAdminUsers.ts
import { callAPI } from "@/CentralAPI/centralapi";
import type { userResponse } from "@/responses/userresponse";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { MonitorData } from "@/responses/MonitorResponse";

export const useGetUsers = () => {
  const auth = useSelector((state: RootState) => state.auth);  
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await callAPI<{ users: userResponse[] }>({
        method: "get",
        url: "/api/users",
      });
      return res.users;
    },
    enabled: !!auth.accessToken, 
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await callAPI({
        method: "delete",
        url: `/api/users/${id}`,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};

export const useGetUserById = (id: string) => {
  const auth = useSelector((state: RootState) => state.auth);

  return useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res = await callAPI<{ user: userResponse, monitors: MonitorData[] }>({
        method: "get",
        url: `/api/users/${id}`,
      });
      return res;
    },
    enabled: !!id && !!auth.accessToken, 
  });
};

export const useGetCurrentUser = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await callAPI<{ user: userResponse }>({
        method: "get",
        url: "/api/users/me",
      });
      return res.user;
    },
    enabled: !!auth.accessToken, 
  });
};
