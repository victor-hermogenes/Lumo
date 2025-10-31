use rusqlite::{Connection, Result};

pub fn get_connection() -> Result<Connection> {
    Connection::open("lumo.db")
}

#[tauri::command]
pub fn init_db() -> Result<String, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    let setup = "
        -- === CUSTOMERS ===
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        -- === SERVICES ===
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL,
            customer_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES customers(id)
        );

        -- === INCOME ===
        CREATE TABLE IF NOT EXISTS income (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source TEXT NOT NULL,
            amount REAL NOT NULL CHECK(amount >= 0),
            date TEXT NOT NULL,
            description TEXT,
            service_id INTEGER,
            customer_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (service_id) REFERENCES services(id),
            FOREIGN KEY (customer_id) REFERENCES customers(id)
        );

        -- === EXPENSES ===
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            amount REAL NOT NULL CHECK(amount >= 0),
            date TEXT NOT NULL,
            description TEXT,
            service_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (service_id) REFERENCES services(id)
        );

        -- === TRANSACTIONS ===
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
            reference_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        -- === BANK ACCOUNTS ===
        CREATE TABLE IF NOT EXISTS bank_accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            bank_name TEXT,
            account_number TEXT,
            currency TEXT DEFAULT 'USD',
            balance REAL DEFAULT 0,
            last_sync TEXT
        );

        -- === BANK TRANSACTIONS ===
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

        -- === SETTINGS ===
        CREATE TABLE IF NOT EXISTS settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            value TEXT,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
    ";

    conn.execute_batch(setup).map_err(|e| e.to_string())?;
    Ok("Database initialized successfully.".into())
}
