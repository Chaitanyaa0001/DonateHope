export interface RequestOTPResponse  {
    message: string,
    success : boolean
}

export interface verifyOTPResponse {
    message: string,
    role: "admin" | "user",
    accessToken: string,
    userId : string
};

export interface RefreshTokenResponse {
  role?: 'admin' | 'user';
  userId?: string;
  message?: string;
}