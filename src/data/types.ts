export type ISODate = string;
export interface Expense {
  id: number;
  amount_cents: number;
  description: string;
  category: string;
  occurred_at: ISODate;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface Income {
  id: number;
  amount_cents: number;
  source: string;
  notes?: string | null;
  received_at: ISODate;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface BalanceSummary {
  total_income_cents: number;
  total_expense_cents: number;
  net_cents: number;
  month?: string; 
}
