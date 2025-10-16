export interface RequestOTPResponse  {
    message: string,
    success : boolean
}

export interface verifyOTPResponse {
    message: string,
    role: "donor" | "funder",
    accessToken: string,
    userId : string
};

export interface RefreshTokenResponse {
  role?: 'donor' | 'funder';
  userId?: string;
  message?: string;
}