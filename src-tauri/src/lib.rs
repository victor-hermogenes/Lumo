mod db;
mod income;
mod expenses;
mod customers;
mod services;
mod bank;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            db::init_db,
            income::add_income,
            income::list_income,
            expenses::add_expense,
            expenses::list_expenses,
            customers::add_customer,
            customers::list_customers,
            services::add_service,
            services::list_services,
            bank::add_bank_transaction
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
