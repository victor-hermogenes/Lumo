use rusqlite::{Connection, Result};

pub fn get_connection() -> Result<Connection> {
    Connection::open("lumo.db")
}

#[tauri::command]
pub fn init_db() -> Result<String, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    let setup = "
        CREATE TABLE IF NOT EXISTS income (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            customer_id INTEGER,
            service_id INTEGER,
            source_type TEXT DEFAULT 'manual',
            source_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            service_id INTEGER,
            source_type TEXT DEFAULT 'manual',
            source_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            phone TEXT
        );

        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL
        );

        CREATE TABLE IF NOT EXISTS bank_accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            bank_name TEXT,
            account_number TEXT,
            currency TEXT,
            balance REAL DEFAULT 0,
            last_sync TEXT
        );

        CREATE TABLE IF NOT EXISTS bank_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bank_account_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            description TEXT,
            amount REAL NOT NULL,
            type TEXT CHECK(type IN ('income', 'expense')),
            linked_income_id INTEGER,
            linked_expense_id INTEGER,
            FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id),
            FOREIGN KEY (linked_income_id) REFERENCES income(id),
            FOREIGN KEY (linked_expense_id) REFERENCES expenses(id)
        );
    ";
    conn.execute_batch(setup).map_err(|e| e.to_string())?;
    Ok("Database initialized".into())
}
