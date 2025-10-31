use rusqlite::{params, Result};
use crate::db::get_connection;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Setting {
    pub key: String,
    pub value: String,
}

#[tauri::command]
pub fn get_settings(key: Option<String>) -> Result<Vec<Setting>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    // If a key is provided → return single setting
    if let Some(k) = key {
        let mut stmt = conn
            .prepare("SELECT key, value FROM settings WHERE key = ?1")
            .map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map(params![k], |row| {
                Ok(Setting {
                    key: row.get(0)?,
                    value: row.get(1)?,
                })
            })
            .map_err(|e| e.to_string())?;

        let mut results = Vec::new();
        for row in rows {
            results.push(row.map_err(|e| e.to_string())?);
        }
        return Ok(results);
    }

    // Otherwise → return all settings
    let mut stmt = conn
        .prepare("SELECT key, value FROM settings")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(Setting {
                key: row.get(0)?,
                value: row.get(1)?,
            })
        })
        .map_err(|e| e.to_string())?;

    let mut settings = Vec::new();
    for row in rows {
        settings.push(row.map_err(|e| e.to_string())?);
    }

    Ok(settings)
}

/// Insert or update a setting by key
#[tauri::command]
pub fn update_settings(key: String, value: String) -> Result<String, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    // Insert or replace (upsert)
    conn.execute(
        "INSERT INTO settings (key, value, updated_at)
         VALUES (?1, ?2, CURRENT_TIMESTAMP)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP",
        params![key, value],
    )
    .map_err(|e| e.to_string())?;

    Ok(format!("Setting '{}' updated successfully", key))
}

#[tauri::command]
pub fn reset_settings() -> Result<String, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM settings", []).map_err(|e| e.to_string())?;
    Ok("All settings cleared.".into())
}
