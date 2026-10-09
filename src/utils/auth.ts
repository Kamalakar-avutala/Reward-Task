import type { User } from "./user";

const AUTH_KEY = "interview_reward_user";

export const loginUser = (user: User): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getLoggedInUser = (): User | null => {
  const user = localStorage.getItem(AUTH_KEY);

  return user ? (JSON.parse(user) as User) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_KEY);
};