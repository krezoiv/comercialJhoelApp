import { useEffect, useState } from "react";
import { bankService } from "../services/bank.service";
import type { BankGroup } from "../interfaces/bank-group.interface"; // 🔥 FIX
import type { BankApiResponse } from "../interfaces/bank-api-response";
export const useBanks = () => {
  const [banks, setBanks] = useState<BankGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanks = async () => {
    try {
      setLoading(true);

      // 🔥 TIPADO AQUÍ
      const raw: BankApiResponse[] = await bankService.getBankAccounts();

      const grouped: Record<string, BankGroup> = {};

      raw.forEach((item) => {
        if (!grouped[item.bankName]) {
          grouped[item.bankName] = {
            bank: item.bankName,
            accounts: [],
          };
        }

        grouped[item.bankName].accounts.push({
          number: item.bankAccountNumber,
          name: item.bankAccountName,
          inicial: Number(item.initialBalance ?? 0),
          final: Number(item.finalBalance ?? 0),
          accountTypeName: item.accountTypeName,
          bankAccountNumber: item.bankAccountNumber,
        });
      });

      setBanks(Object.values(grouped));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return {
    banks,
    loading,
    refetch: fetchBanks,
  };
};
