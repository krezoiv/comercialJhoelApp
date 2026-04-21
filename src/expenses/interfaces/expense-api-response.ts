export interface ExpenseApiResponse {
  id: string;
  name: string;
  client: string;
  amount: string;
  type: "credit" | "debit";
  entryDate: string;
  applyDate: string;
}
