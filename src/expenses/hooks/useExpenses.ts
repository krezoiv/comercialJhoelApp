import { useEffect, useState } from "react";
import { expenseService } from "../services/expense.service";

import type { ExpenseCustomer } from "../interfaces/expense-customer.interface";

export const useExpenses = () => {
  const [data, setData] = useState<ExpenseCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const res = await expenseService.getExpensesByCustomer();

      setData(res); // 🔥 YA NO HAY MAP
    } catch (error) {
      console.error("🔥 ERROR cargando gastos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    data,
    loading,
    refetch: fetchExpenses,
  };
};
