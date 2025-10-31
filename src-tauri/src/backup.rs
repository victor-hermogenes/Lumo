use crate::db::get_connection;
use rusqlite::Connection;
use serde::Serialize;
use std::fs;

#[derive(Serialize)]
struct BackupData {
    customers: Vec<serde_json::Value>,
    services: Vec<serde_json::Value>,
    income: Vec<serde_json::Value>,
    expenses: Vec<serde_json::Value>,
    transactions: Vec<serde_json::Value>,
    bank_accounts: Vec<serde_json::Value>,
    bank_transactions: Vec<serde_json::Value>,
    settings: Vec<serde_json::Value>,
}

use rusqlite::{types::ValueRef, Result};
use serde_json::Value as JsonValue;

fn fetch_all(conn: &Connection, table: &str) -> Result<Vec<JsonValue>, String> {
    let mut stmt = conn
        .prepare(&format!("SELECT * FROM {}", table))
        .map_err(|e| e.to_string())?;

    let column_names: Vec<String> = stmt.column_names().iter().map(|&s| s.to_string()).collect();

    let rows = stmt
        .query_map([], |row| {
            let mut obj = serde_json::Map::new();
            for (i, name) in column_names.iter().enumerate() {
                let value_ref = row.get_ref(i)?;
                let value = match value_ref {
                    ValueRef::Null => JsonValue::Null,
                    ValueRef::Integer(v) => JsonValue::from(v),
                    ValueRef::Real(v) => JsonValue::from(v),
                    ValueRef::Text(v) => {
                        let text = String::from_utf8_lossy(v).to_string();
                        JsonValue::from(text)
                    }
                    ValueRef::Blob(_) => JsonValue::String("[BLOB_DATA]".into()),
                };
                obj.insert(name.clone(), value);
            }
            Ok(JsonValue::Object(obj))
        })
        .map_err(|e| e.to_string())?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row.map_err(|e| e.to_string())?);
    }

    Ok(results)
}

#[tauri::command]
pub fn export_backup() -> Result<String, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    let data = BackupData {
        customers: fetch_all(&conn, "customers")?,
        services: fetch_all(&conn, "services")?,
        income: fetch_all(&conn, "income")?,
        expenses: fetch_all(&conn, "expenses")?,
        transactions: fetch_all(&conn, "transactions")?,
        bank_accounts: fetch_all(&conn, "bank_accounts")?,
        bank_transactions: fetch_all(&conn, "bank_transactions")?,
        settings: fetch_all(&conn, "settings")?,
    };

    let json = serde_json::to_string_pretty(&data).map_err(|e| e.to_string())?;

    let mut path = dirs::document_dir().ok_or("Could not find documents directory")?;
    path.push("Lumo");
    path.push("backups");

    fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    path.push(format!(
        "backup_{}.json",
        chrono::Local::now().format("%Y-%m-%d_%H-%M-%S")
    ));

    fs::write(&path, json).map_err(|e| e.to_string())?;

    Ok(format!("Backup created at: {}", path.display()))
}
