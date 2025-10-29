CREATE INDEX IF NOT EXISTS idx_expense_date ON expense (ocurred_at);
CREATE INDEX IF NOT EXISTS idx_income_date ON income (received_at);
CREATE INDEX IF NOT EXISTS idx_expense_cat ON expense (category);