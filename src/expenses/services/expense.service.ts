import { api } from "../../shared/services/api";

import type {
  ApiResponse,
  ExpenseApiItem,
} from "../interfaces/expense-response.interface";
import type { ExpenseCustomer } from "../interfaces/expense-customer.interface";
import type { CreateExpenseDto } from "../interfaces/expense-request.interface";

export const expenseService = {
  getExpenses: async (): Promise<ExpenseApiItem[]> => {
    const res = await api.get<ApiResponse<ExpenseApiItem[]>>("/expenses");
    return res.data.data;
  },

  createExpense: async (payload: CreateExpenseDto) => {
    const res = await api.post("/expenses", payload);
    return res.data;
  },

  getExpensesByCustomer: async (): Promise<ExpenseCustomer[]> => {
    const res = await api.get<ApiResponse<ExpenseCustomer[]>>(
      "/expenses/expenses-customer",
    );

    return res.data.data;
  },
};
