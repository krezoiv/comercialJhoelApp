import type { DetailItem } from "./detail-item.interface";

export interface BankAgent {
  customerId: string;

  firstName: string;

  lastName: string;

  totalAmount: number;

  totalTransactions: number;

  details: DetailItem[];
}
