import { useEffect, useState } from "react";
import { bankService } from "../services/bank.service";
import type { BankAccount, BankGroup } from "../interfaces/bank.interface";

export const useBanks = () => {
  const [banks, setBanks] = useState<BankGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanks();
  }, []);

  const loadBanks = async () => {
    try {
      const data: BankAccount[] = await bankService.getBankAccounts();

      console.log("DATA 👉", data);

      if (!data) {
        setBanks([]);
        return;
      }

      const grouped = data.reduce<Record<string, BankGroup>>((acc, item) => {
        const bankName = item.bankName;

        if (!acc[bankName]) {
          acc[bankName] = {
            bank: bankName,
            accounts: [],
          };
        }

        acc[bankName].accounts.push({
          number: item.bankAccountNumber,
          name: item.bankAccountName,
          accountTypeName: item.accountTypeName,
          inicial: Number(item.initialBalance),
          final: Number(item.finalBalance),
          bankAccountNumber: item.bankAccountNumber,
        });

        return acc;
      }, {});

      setBanks(Object.values(grouped));
    } catch (error) {
      console.error("Error cargando bancos", error);
    } finally {
      setLoading(false);
    }
  };

  return { banks, loading };
};
