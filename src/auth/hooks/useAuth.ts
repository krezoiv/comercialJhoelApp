import { useState } from "react";
import { login } from "../services/index-auth.service";
import { tokenService } from "../services/tokenService.service"; // 👈 usa esto

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async (userName: string, password: string) => {
    try {
      setLoading(true);

      const data = await login(userName, password);

      // ✅ usar tokenService (NO localStorage directo)
      tokenService.setToken(data.data.access_token);

      return true;
    } catch (error) {
      console.error("Error login:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  localStorage.getItem("auth_token");

  return {
    signIn,
    loading,
  };
};
