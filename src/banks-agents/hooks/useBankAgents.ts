import { useEffect, useState } from "react";
import type { BankAgent } from "../interfaces/bank-agent.interface";

export const useBankAgents = () => {
  const [data, setData] = useState<BankAgent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBankAgents = async () => {
    try {
      setLoading(true);

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
