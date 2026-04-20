import { api } from "../../shared/services/api";

export const bankService = {
  getBankAccounts: async () => {
    const res = await api.get("/banks-accounts");
    return res.data.data;
  },

  updateBalances: async (
    payload: {
      accountNumber: string;
      initialBalance: number;
      finalBalance: number;
    }[],
  ) => {
    const res = await api.put("/banks-accounts/update-balances", payload);
    return res.data;
  },

  // 🔥 NUEVO MÉTODO
  updateFinalBalances: async (
    payload: {
      accountNumber: string;
      finalBalance: number;
    }[],
  ) => {
    const res = await api.patch("/banks-accounts/final-balance", payload);
    return res.data;
  },
};
