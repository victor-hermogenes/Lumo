import { invoke } from "@tauri-apps/api";
import type { Expense } from "./types";

export interface NewExpense {
  amount_cents: number;
  description: string;
  category?: string;
  occurred_at: string; // ISO
}

export async function createExpense(payload: NewExpense): Promise<Expense> {
  return await invoke<Expense>("create_expense", { payload });
}
