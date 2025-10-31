import { call } from "./db";

export interface Transaction {
  id: number;
  txn_type: "income" | "expense";
  reference_id: number;
  amount: number;
  date: string;
  description?: string;
}

export async function listTransactions(): Promise<Transaction[]> {
  return call("list_transactions");
}

export async function addTransaction(
  data: Omit<Transaction, "id">
): Promise<string> {
  return call("add_transaction", data);
}
