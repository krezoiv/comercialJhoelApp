import { api } from "../../shared/services/api";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

import type { BankAgent } from "../interfaces/bank-agent.interface";

export const bankAgentService = {
  getBankAgents: async (): Promise<BankAgent[]> => {
    const res = await api.get<ApiResponse<BankAgent[]>>(
      "/bank-agents/bank-agents-customer",
    );

    return res.data.data;
  },

  createBankAgent: async (payload: {
    customerId: string;
    amount: number;
    bank: string;
  }) => {
    const res = await api.post("/bank-agents", payload);
    return res.data;
  },
};
