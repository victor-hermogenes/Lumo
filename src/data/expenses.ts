import { call } from "./db";

export interface Expense {
  id?: number;
  category: string;
  amount: number;
  date: string;
  description?: string;
  service_id?: number;
}

export async function addExpense(data: Omit<Expense, "id">) {
  return call("add_expense", data);
}

export async function listExpenses(): Promise<Expense[]> {
  return call("list_expenses");
}
