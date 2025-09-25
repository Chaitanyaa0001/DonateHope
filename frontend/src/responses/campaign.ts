export interface CampaignData {
  _id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  location: string;
  category: string;
  donors: number;
  daysLeft: number;
  user: {
    _id: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
};
