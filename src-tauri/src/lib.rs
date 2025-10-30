// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use rusqlite::{Connection, Result};

// Existing greet command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// === New command: Initialize the database ===
#[tauri::command]
fn init_db() -> Result<String, String> {
    let path = "lumo.db"; 
    match Connection::open(path) {
        Ok(conn) => {
            let setup = "
                CREATE TABLE IF NOT EXISTS income (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source TEXT NOT NULL,
                    amount REAL NOT NULL,
                    date TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS expenses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category TEXT NOT NULL,
                    amount REAL NOT NULL,
                    date TEXT NOT NULL
                );
            ";
            if let Err(err) = conn.execute_batch(setup) {
                return Err(format!("DB setup error: {}", err));
            }
            Ok(format!("Database initialized at '{}'", path))
        }
        Err(err) => Err(format!("Failed to open DB: {}", err)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        // Register both greet and init_db here:
        .invoke_handler(tauri::generate_handler![greet, init_db])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
