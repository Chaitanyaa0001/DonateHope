export interface Campaign {
  id: string;
  title: string;
  description: string;
  location: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  category: 'Medical' | 'Education' | 'Disaster Relief';
  image: string;
  urgent?: boolean;
}

interface NewCampaignData {
  title: string;
  description: string;
  location: string;
  goal: number;
  category: string;
  urgent?: boolean;
  image: File;
}

