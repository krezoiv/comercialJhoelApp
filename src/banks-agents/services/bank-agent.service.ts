import { api } from "../../shared/services/api";

export const bankAgentService = {
  createBankAgent: async (payload: {
    customerId: string;
    bankId: string;
    userId: string;
    amount: number;
    description: string;
    paymentDate: string;
  }) => {
    const res = await api.post("/bankAgents", payload);

    console.log("📦 RESPUESTA:", res.data);

    return res.data;
  },
};
