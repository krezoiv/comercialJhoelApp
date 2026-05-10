import { api } from "../../shared/services/api";
import type { DetailItem } from "../interfaces/detail-item.interface";

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

  getBankAgentsByCustomers: async () => {
    const res = await api.get("/bankAgents/bankAgents-customers");

    console.log("📊 DATA GET:", res.data);

    return res.data.data;
  },

  processBankAgents: async (data: DetailItem[]) => {
    const payload = data.map((item) => ({
      id: item.id,
      amount: parseFloat(String(item.amount)),
      createdAt: new Date(item.createdAt).toISOString(),
      checked: Boolean(item.checked),
    }));

    console.log("📦 PAYLOAD:", JSON.stringify(payload, null, 2));
    console.log("📤 PAYLOAD:", payload);

    const res = await api.post("/bankAgents/process", {
      data: payload,
    });

    return res.data;
  },

  getBankAgentsByCustomerId: async (customerId: string) => {
    const res = await api.get(`/bankAgents/customer/${customerId}`);

    console.log("🔥 DRILL RESPONSE:", res.data);

    return res.data.data;
  },
};
