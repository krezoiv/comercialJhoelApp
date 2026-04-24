import { useEffect, useState } from "react";
import { expenseService } from "../services/expense.service";
import type { Expense } from "../interfaces/expense.interface";
import type { ExpenseApiItem } from "../interfaces/expense-response.interface";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const data = await expenseService.getExpenses();

      // ✅ AQUÍ ESTÁ LA SOLUCIÓN (TIPADO CORRECTO)
      const mapped: Expense[] = data.map((e: ExpenseApiItem) => ({
        id: e.id,
        name: e.description,
        client: `${e.firstName} ${e.lastName}`,
        amount: Number(e.amount || 0),
        type: "debit", // ⚠️ temporal porque backend no lo envía
        entryDate: e.createdAt,
        applyDate: e.updatedAt,
      }));

      setExpenses(mapped);
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
    expenses,
    loading,
    refetch: fetchExpenses,
  };
};
