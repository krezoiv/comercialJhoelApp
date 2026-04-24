import { api } from "../../shared/services/api";
import type { Expense } from "../interfaces/expense.interface";
import type {
  ApiResponse,
  ExpenseApiItem,
} from "../interfaces/expense-response.interface";

export const expenseService = {
  getExpenses: async (): Promise<ExpenseApiItem[]> => {
    const res = await api.get<ApiResponse<ExpenseApiItem[]>>("/expenses");
    return res.data.data;
  },

  createExpense: async (payload: Omit<Expense, "id">): Promise<Expense> => {
    const res = await api.post("/expenses", payload);
    return res.data;
  },
};
