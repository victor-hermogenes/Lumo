import { call } from "./db";

export interface Customer {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
}

export async function addCustomer(data: Omit<Customer, "id">): Promise<string> {
  return call("add_customer", data);
}

export async function listCustomers(): Promise<Customer[]> {
  return call("list_customers");
}
