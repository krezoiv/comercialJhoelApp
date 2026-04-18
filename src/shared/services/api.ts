// src/shared/api.ts

import axios from "axios";
import { tokenService } from "../../auth/services/index-auth.service";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// 🔐 INTERCEPTOR REQUEST
api.interceptors.request.use((config) => {
  const token = tokenService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🚨 INTERCEPTOR RESPONSE (AUTO LOGOUT)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token inválido o expirado");

      tokenService.removeToken();

      window.location.href = "/login"; // 🔥 redirección automática
    }

    return Promise.reject(error);
  },
);
