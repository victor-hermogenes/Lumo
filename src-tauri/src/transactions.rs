use rusqlite::{params, Result};
use crate::db::get_connection;

#[derive(Debug, serde::Serialize)]
pub struct Transaction {
    pub id: i64,
    pub txn_type: String,  
    pub reference_id: i64, 
    pub amount: f64,
    pub date: String,
    pub description: Option<String>,
}

#[tauri::command]
pub fn list_transactions() -> Result<Vec<Transaction>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare(
            "
            SELECT id, 'income' AS txn_type, id AS reference_id, amount, date, description
            FROM income
            UNION ALL
            SELECT id, 'expense' AS txn_type, id AS reference_id, amount, date, description
            FROM expenses
            ORDER BY date DESC
            ",
        )
        .map_err(|e| e.to_string())?;

    let rows = stmt
        .query_map([], |row| {
            Ok(Transaction {
                id: row.get(0)?,
                txn_type: row.get(1)?,
                reference_id: row.get(2)?,
                amount: row.get(3)?,
                date: row.get(4)?,
                description: row.get(5).ok(),
            })
        })
        .map_err(|e| e.to_string())?;

    let mut transactions = Vec::new();
    for r in rows {
        transactions.push(r.map_err(|e| e.to_string())?);
    }

    Ok(transactions)
}

/// Adds a manual transaction (optional feature)
#[tauri::command]
pub fn add_transaction(
    txn_type: String,
    reference_id: i64,
    amount: f64,
    date: String,
    description: Option<String>,
) -> Result<String, String> {
    if txn_type != "income" && txn_type != "expense" {
        return Err("Invalid transaction type. Must be 'income' or 'expense'.".into());
    }

    let conn = get_connection().map_err(|e| e.to_string())?;

    conn.execute(
        "
        INSERT INTO transactions (type, reference_id, amount, date, description)
        VALUES (?1, ?2, ?3, ?4, ?5)
        ",
        params![txn_type, reference_id, amount, date, description],
    )
    .map_err(|e| e.to_string())?;

    Ok(format!("Transaction recorded successfully ({txn_type})."))
}
