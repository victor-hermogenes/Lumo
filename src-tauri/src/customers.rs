use rusqlite::Result;
use crate::db::get_connection;

#[tauri::command]
pub fn add_customer(name: String, email: Option<String>, phone: Option<String>) -> Result<(), String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO customers (name, email, phone) VALUES (?1, ?2, ?3)",
        (&name, &email, &phone),
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn list_customers() -> Result<Vec<(i64, String, Option<String>, Option<String>)>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT id, name, email, phone FROM customers").map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)))
        .map_err(|e| e.to_string())?;
    let mut out = Vec::new();
    for r in rows { out.push(r.map_err(|e| e.to_string())?); }
    Ok(out)
}
