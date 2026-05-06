import { api } from "../../shared/services/api";

type DetailItem = {
  id: string;
  amount: number;
  createdAt: string;
  checked: boolean;
};

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

  processBankAgents: async (data: DetailItem[]) => {
    const payload = data.map((item) => ({
      id: item.id,
      amount: Number(item.amount),
      createdAt: new Date(item.createdAt).toISOString(),
      checked: item.checked,
    }));

    console.log("📤 PAYLOAD:", payload);

    const res = await api.post("/bankAgents/process", {
      data: payload, // 👈 este sí está bien para el DTO
    });

    return res.data;
  },
};
