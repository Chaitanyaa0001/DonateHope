export interface IUser extends Document {
  email: string;
  fullname: string;
  otp?: string;
  otpExpiresAt?: Date;
  role: 'donor' | 'funder';   // <-- fixed spelling
  isVerified: boolean;
}
