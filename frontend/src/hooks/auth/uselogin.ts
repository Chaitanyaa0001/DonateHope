import { callAPI } from "@/CentralAPI/centralapi";
import type { RefreshTokenResponse, RequestOTPResponse, verifyOTPResponse } from "../../responses/authresponse";

export const requestOTP = async (email: string ,fullName: string, role: string) => {
  return  await callAPI<RequestOTPResponse, {email: string,fullname: string, role: string}>({
    method : "post",
    url: "/auth/request-otp",
    data: {email, fullname: fullName, role}
  })
};

export const verifyOTP = async (identifier: string, otp: string) => {
  return await  callAPI<verifyOTPResponse, {identifier: string, otp: string}>({
    method: "post",
    url: "/auth/verify-otp",
    data: {identifier, otp}
  });
};
export  const logout = async () =>{
  return await callAPI({method:"post", url: "/auth/logout"}) 
}

export const refreshToken = async () => {
  return await callAPI<RefreshTokenResponse>({
    method: "get",
    url: "/auth/refresh-token"
  });
};