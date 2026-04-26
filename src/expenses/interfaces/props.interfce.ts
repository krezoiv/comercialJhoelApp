export interface Props {
  onSubmit: (data: {
    name: string;
    clientId: string;
    amount: number;
    expenseType: string;
    entryDate: string;
    applyDate: string;
    category: string;
  }) => void;
}
