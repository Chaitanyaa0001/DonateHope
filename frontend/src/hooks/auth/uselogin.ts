import api from "../../utils/axios";
import type { RequestOTPResponse, verifyOTPResponse } from "./authresponse";

export const requestOTP = async (email: string,fullName: string, role: string) => {
  return  await api.post<RequestOTPResponse>("/auth/request-otp", { email, fullname:fullName, role });
};

export const verifyOTP = async (identifier: string, otp: string) => {
  return await  api.post<verifyOTPResponse>("/auth/verify-otp", { identifier, otp });
};

export const refreshToken = async () => {
  return await api.get("/auth/refresh-token");
};