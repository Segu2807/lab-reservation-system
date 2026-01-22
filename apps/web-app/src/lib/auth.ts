import { jwtDecode } from "jwt-decode";

export type UserRole = "ADMIN" | "USER" | "STUDENT";

export interface JwtUser {
  id: string;
  email: string;
  role: UserRole;
}

export function getUserFromToken(): JwtUser | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<JwtUser>(token);
  } catch {
    return null;
  }
}
