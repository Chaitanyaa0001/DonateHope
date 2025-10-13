export interface Campaign {
  id: string;
  title: string;
  description: string;
  location: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft?: number;
  category: string;
  image: string;
  urgent?: boolean;
}



