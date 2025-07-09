import type { TokenPayload } from "../App";

export const getTokenPayload = (): TokenPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.userId,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp
    };
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};