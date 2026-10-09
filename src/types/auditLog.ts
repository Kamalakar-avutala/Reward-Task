export interface AuditLog {
  id: number;
  timestamp: string;
  userId: string;
  userName: string;
  module: string;
  action: string;
  description: string;
  status: "Success" | "Failed";
}
