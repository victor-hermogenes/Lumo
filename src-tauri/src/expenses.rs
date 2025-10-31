use rusqlite::Result;
use crate::db::get_connection;

#[tauri::command]
pub fn add_expense(category: String, amount: f64, date: String) -> Result<(), String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO expenses (category, amount, date) VALUES (?1, ?2, ?3)",
        (&category, amount, &date),
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn list_expenses() -> Result<Vec<(i64, String, f64, String)>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT id, category, amount, date FROM expenses").map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)))
        .map_err(|e| e.to_string())?;
    let mut out = Vec::new();
    for r in rows { out.push(r.map_err(|e| e.to_string())?); }
    Ok(out)
}
