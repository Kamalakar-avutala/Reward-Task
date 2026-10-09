export type UserRole = "Admin" | "User";
export type UserStatus = "Active" | "Inactive";

export interface User {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  department: string;
}