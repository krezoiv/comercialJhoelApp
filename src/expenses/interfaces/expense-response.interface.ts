export interface ExpenseApiItem {
  id: string;
  description: string;
  amount: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
