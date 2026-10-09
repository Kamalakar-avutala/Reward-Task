export type TransactionType = "Credit" | "Debit" | "Reversal";

export interface PointTransaction {
  id: number;
  transactionId: string;
  date: string;
  type: TransactionType;
  points: number;
  balanceAfter: number;
  source: string;
  description: string;
  status: "Completed" | "Pending" | "Reversed";
}