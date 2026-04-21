import { useEffect, useState } from "react";
import { expenseService } from "../services/expense.service";
import type { Expense } from "../interfaces/expense.interface";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      // ✅ YA VIENE TIPADO COMO Expense[]
      const data = await expenseService.getExpenses();

      setExpenses(data);
    } catch (error) {
      console.error("Error cargando gastos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    refetch: fetchExpenses,
  };
};
