use serde::{Serialize, Deserialize};
use rusqlite::params;

#[derive(Serialize, Deserialize)]
pub struct NewExpense {
  pub amount_cents: i64,
  pub description: String,
  pub category: Option<String>,
  pub occurred_at: String,
}

#[derive(Serialize)]
pub struct Expense {
  pub id: i64,
  pub amount_cents: i64,
  pub description: String,
  pub category: String,
  pub occurred_at: String,
  pub created_at: String,
  pub updated_at: String,
}

#[tauri::command]
pub fn create_expense(payload: NewExpense) -> Result<Expense, String> {
  let conn = crate::db::connect().map_err(|e| e.to_string())?;
  crate::db::run_migrations(&conn).map_err(|e| e.to_string())?;
  let cat = payload.category.unwrap_or_else(|| "general".into());
  conn.execute(
    "INSERT INTO expense (amount_cents, description, category, occurred_at)
     VALUES (?1, ?2, ?3, ?4)",
    params![payload.amount_cents, payload.description, cat, payload.occurred_at],
  ).map_err(|e| e.to_string())?;

  let id = conn.last_insert_rowid();
  let mut stmt = conn.prepare("SELECT * FROM expense WHERE id = ?1").map_err(|e| e.to_string())?;
  let row = stmt.query_row(params![id], |r| {
    Ok(Expense{
      id: r.get(0)?, amount_cents: r.get(1)?, description: r.get(2)?,
      category: r.get(3)?, occurred_at: r.get(4)?,
      created_at: r.get(5)?, updated_at: r.get(6)?
    })
  }).map_err(|e| e.to_string())?;

  Ok(row)
}
