use actix_web::{http::StatusCode, ResponseError};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ApiError {
    Sqlx(#[from] sqlx::Error),
}

impl std::fmt::Display for ApiError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl ResponseError for ApiError {
    fn status_code(&self) -> actix_web::http::StatusCode {
        match self {
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

pub type ApiResult<T> = Result<T, ApiError>;
