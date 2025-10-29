use thiserror::Error;
#[derive(Error, Debug)]
pub enum AppError {
  #[error("database error: {0}")]
  Db(String),
  #[error("invalid input: {0}")]
  Input(String),
}
impl From<rusqlite::Error> for AppError {
  fn from(e: rusqlite::Error) -> Self { Self::Db(e.to_string()) }
}
