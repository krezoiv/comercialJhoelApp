import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// interceptor simple
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // 🔥 ESTE ERA EL ERROR

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const bankService = {
  getBankAccounts: async () => {
    const response = await api.get("/banks-accounts");
    return response.data.data;
  },
};
