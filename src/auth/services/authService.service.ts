import { api } from "../../shared/services/api";

export const login = async (userName: string, password: string) => {
  const response = await api.post("/auth/login", {
    userName,
    password,
  });

  return response.data;
};
