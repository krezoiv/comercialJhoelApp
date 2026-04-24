export interface ExpenseCustomer {
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  totalExpenses: number;
  totalAmount: string; // viene string desde backend
  firstExpenseDate: string;
  lastExpenseDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
