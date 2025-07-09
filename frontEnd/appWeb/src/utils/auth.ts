// utils/auth.ts
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const getAccessToken = () => {
    return localStorage.getItem("token");
};

export const isAuthenticated = () => { 
    return !!getAccessToken() && !!getCurrentUser(); // Ambas deben existir
};

export const getUserRole = () => {
    const user = getCurrentUser();
    return user?.roles?.[0]?.type || null;
};

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}