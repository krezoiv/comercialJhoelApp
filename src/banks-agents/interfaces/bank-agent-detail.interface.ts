export interface BankAgentDetail {
  id: string;
  customerId: string;
  bankId: string;
  userId: string;
  description: string;
  amount: number;
  paymentDate: string;
  createdAt: string;

  // extras
  bankName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userName: string;
  checked?: boolean;
}
