export interface IUser extends Document {
  email: string;
  fullname: string;
  role: 'donor' | 'funder';   
  isVerified: boolean;
}
