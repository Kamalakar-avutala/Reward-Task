export type RedemptionStatus =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Cancelled"
  | "Rejected";

export interface Redemption {
  id: number;
  redemptionId: string;
  date: string;
  rewardName: string;
  category: string;
  pointsUsed: number;
  quantity: number;
  status: RedemptionStatus;
  description: string;
}