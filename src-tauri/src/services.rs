use rusqlite::Result;
use crate::db::get_connection;

#[tauri::command]
pub fn add_service(name: String, description: Option<String>, price: Option<f64>) -> Result<(), String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO services (name, description, price) VALUES (?1, ?2, ?3)",
        (&name, &description, &price),
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn list_services() -> Result<Vec<(i64, String, Option<String>, Option<f64>)>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT id, name, description, price FROM services").map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?)))
        .map_err(|e| e.to_string())?;
    let mut out = Vec::new();
    for r in rows { out.push(r.map_err(|e| e.to_string())?); }
    Ok(out)
}
