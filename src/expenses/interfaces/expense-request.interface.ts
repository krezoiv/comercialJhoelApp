export type CreateExpenseRequest = {
  name: string;
  client: string;
  amount: number;
  type: "credit" | "debit";
  entryDate: string;
  applyDate: string;
};

export interface CreateExpenseDto {
  name: string;
  clientId: string;
  amount: number;
  entryDate: string;
  applyDate: string;
}
