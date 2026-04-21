import { api } from "../../shared/services/api";
import type { Expense } from "../interfaces/expense.interface";

export const expenseService = {
  getExpenses: async (): Promise<Expense[]> => {
    const res = await api.get("/expenses");
    return res.data.data;
  },

  createExpense: async (payload: Omit<Expense, "id">): Promise<Expense> => {
    const res = await api.post("/expenses", payload);
    return res.data;
  },
};
