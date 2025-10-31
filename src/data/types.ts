export interface BaseRecord {
  id?: number;
  date: string;
  description?: string;
  created_at?: string;
}

export interface Income extends BaseRecord {
  source: string;
  amount: number;
  customer_id?: number;
  service_id?: number;
}

export interface Expense extends BaseRecord {
  category: string;
  amount: number;
  service_id?: number;
}
