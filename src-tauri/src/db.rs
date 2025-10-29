use rusqlite::{Connection, params};
use std::path::PathBuf;

pub fn db_path() -> PathBuf {
    tauri::api::path::app_dir(&tauri::Config::default())
        .unwrap_or_else(|| std::env::current_dir().unwrap())
        .join("lumo.db")
}

pub fn connect() -> anyhow::Result<Connection> {
    let path = db_path();
    let mut conn = Connection::open(path)?;
    conn.pragma_update(None, "foreign_keys", &"ON")?;
    Ok(conn)
}

pub fn run_migrations(conn: &Connection) -> anyhow::Result<()> {
    let migs = vec![
        include_str!("../migrations/0001_init.sql"),
        include_str!("../migrations/0002_indexes.sql"),
    ];
    for sql in migs {
        conn.execute_batch(sql)?;
    }
    Ok(())
}
