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
