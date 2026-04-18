const TOKEN_KEY = "auth_token";

export const tokenService = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  decodeToken: () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;

      const parts = token.split(".");
      if (parts.length !== 3) {
        console.warn("Token no es JWT válido");
        return null;
      }

      const payload = parts[1];

      // 🔥 FIX base64 URL
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

      const decoded = JSON.parse(atob(base64));

      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; // 🔥 NO rompas la app
    }
  },
};
