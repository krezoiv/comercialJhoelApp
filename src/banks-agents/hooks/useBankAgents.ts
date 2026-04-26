import { useEffect, useState } from "react";
import { bankAgentService } from "../services/bank-agent.service";
import type { BankAgent } from "../interfaces/bank-agent.interface";

export const useBankAgents = () => {
  const [data, setData] = useState<BankAgent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBankAgents = async () => {
    try {
      setLoading(true);
      const res = await bankAgentService.getBankAgents();
      setData(res);
    } catch (error) {
      console.error("🔥 ERROR cargando agentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankAgents();
  }, []);

  return {
    data,
    loading,
    refetch: fetchBankAgents,
  };
};
