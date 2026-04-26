export type CreateExpenseRequest = {
  name: string;
  client: string;
  amount: number;
  expenseType: string;
  entryDate: string;
  applyDate: string;
};

export interface CreateExpenseDto {
  customerId: string;
  expenseDescription: string;
  expenseAmount: number;
  expenseType: string;
}
