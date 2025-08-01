export interface IUser extends Document {
    email?:string;
    phone?: string;
    fullname: string;
    otp:string;
    otpExpiredAt: Date;
    role: 'donar' | 'funder';
    isVerified: boolean;
}