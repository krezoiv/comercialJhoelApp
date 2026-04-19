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
};
