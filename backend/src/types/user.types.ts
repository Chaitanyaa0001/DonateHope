export interface IUser extends Document {
  email: string;
  fullname: string;
  role: "user" | "admin";
  password?: string;
  isVerified: boolean;
}
