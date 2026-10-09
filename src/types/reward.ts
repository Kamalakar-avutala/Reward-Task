export interface Reward {
  id: number;
  name: string;
  category: string;
  description: string;
  pointsRequired: number;
  stock: number;
  enabled: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}
