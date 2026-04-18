export interface BankAccount {
  id: string;
  initialBalance: string;
  finalBalance: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankName: string;
  accountTypeName: string;
}

export interface BankGroup {
  bank: string;
  accounts: {
    number: string;
    name: string;
    inicial: number;
    final: number;
    accountTypeName: string;
    bankAccountNumber: string;
  }[];
}
