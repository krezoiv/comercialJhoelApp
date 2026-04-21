export type ExpenseType = "credit" | "debit";

export interface Expense {
  id: string;
  name: string;
  client: string;
  amount: number;
  type: ExpenseType;
  entryDate: string;
  applyDate: string;
}
