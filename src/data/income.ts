import { call } from "./db";

export interface Income {
  id?: number;
  source: string;
  amount: number;
  date: string;
  description?: string;
  customer_id?: number;
  service_id?: number;
}

export async function addIncome(data: Omit<Income, "id">) {
  return call("add_income", data);
}

export async function listIncome(): Promise<Income[]> {
  return call("list_income");
}
