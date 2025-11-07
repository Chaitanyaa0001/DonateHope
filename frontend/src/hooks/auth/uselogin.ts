import { useMutation, useQuery } from "@tanstack/react-query";
import { callAPI } from "@/CentralAPI/centralapi";
import type { RefreshTokenResponse, RequestOTPResponse, verifyOTPResponse } from "@/responses/authresponse";

export const useCheckEmail = (email: string) => {
  return useQuery({
    queryKey: ["checkEmail", email],
    queryFn: async () => {
      if (!email) return null;
      const res = await callAPI<{ message: string; role: "admin" | "user" | "none" }>({
        method: "get",
        url: `/api/auth/check-email?email=${email}`,
      });
      return res;
    },
    enabled: !!email,
    staleTime: 30000,
  });
};

export const useRequestOTP = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; role?: string }) => {
      const res = await callAPI<RequestOTPResponse, typeof payload>({
        method: "post",
        url: "/api/auth/request-otp",
        data: payload,
      });
      return res;
    },
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await callAPI<{ message: string }, { email: string; password: string }>({
        method: "post",
        url: "/api/admin/admin-login",
        data: payload,
      });
      return res;
    },
  });
};

export const useVerifyAdminOTP = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const res = await callAPI<
        { message: string; accessToken: string; userId: string; role: "admin" },
        { email: string; otp: string }
      >({
        method: "post",
        url: "/api/admin/verify-admin-otp",
        data: payload,
      });
      return res;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await callAPI<{ message: string }>({
        method: "post",
        url: "/api/auth/logout",
      });
      return res;
    },
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (payload: { identifier: string; otp: string }) => {
      const res = await callAPI<verifyOTPResponse, typeof payload>({
        method: "post",
        url: "/api/auth/verify-otp",
        data: payload,
      });
      return res;
    },
  });
};

export const refreshToken = async () => {
  return await callAPI<RefreshTokenResponse>({
    method: "get",
    url: "/api/auth/refresh-token"
  });
};