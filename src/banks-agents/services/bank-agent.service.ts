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

  // 🔥 ESTE ES EL QUE TE FALTABA
  getBankAgentsByCustomers: async () => {
    const res = await api.get("/bankAgents/bankAgents-customers");

    console.log("📊 DATA GET:", res.data);

    return res.data.data; // 👈 IMPORTANTE (porque tu backend envuelve en data)
  },
};
