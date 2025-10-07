export interface RequestOTPResponse  {
    message: string,
    success : boolean
}

export interface verifyOTPResponse {
    message: string,
    role: "donor" | "funder",
    user:{
        id: string,
        email: string,
        role: "donor" | "funder"
    };
};

export interface RefreshTokenResponse {
  role?: 'donor' | 'funder';
  userId?: string;
  message?: string;
}