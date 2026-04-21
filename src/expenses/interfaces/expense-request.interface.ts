export type CreateExpenseRequest = {
  name: string;
  client: string;
  amount: number;
  type: "credit" | "debit";
  entryDate: string;
  applyDate: string;
};
