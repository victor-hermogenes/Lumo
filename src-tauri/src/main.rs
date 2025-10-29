#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod db;
mod commands;
mod error;
mod models;

use commands::{expense::create_expense};
use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      create_expense,
    ])
    .setup(|_app| {
      let conn = db::connect()?;
      db::run_migrations(&conn)?;
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
