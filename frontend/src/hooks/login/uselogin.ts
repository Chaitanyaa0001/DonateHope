import api from "../../utils/axios";

// Request OTP
export const requestOTP = async (email: string,fullname: string, role: string) => {
  return api.post("/auth/request-otp", { email, fullname, role });
};

// Verify OTP
export const verifyOTP = async (identifier: string, otp: string) => {
  return api.post("/auth/verify-otp", { identifier, otp });
};

