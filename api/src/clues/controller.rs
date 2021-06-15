use super::{Clue, CreateClueDto, UpdateClueDto};
use actix_web::{delete, get, http::StatusCode, post, put, web, HttpResponse, ResponseError};
use anyhow::Context;
use serde::Deserialize;
use sqlx::PgPool;

#[derive(thiserror::Error)]
pub enum CluesError {
    #[error(transparent)]
    UnexpectedError(#[from] anyhow::Error),
}

impl std::fmt::Debug for CluesError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "{:?}", self)
    }
}

impl ResponseError for CluesError {
    fn status_code(&self) -> StatusCode {
        match self {
            CluesError::UnexpectedError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

const CONTEXT_CONNECTION_ACQUIRE: &str = "Failed to acquire a connection from the pool";

#[derive(Debug, Deserialize)]
pub struct CluesRequest {
    search: Option<String>,
}

#[get("/clues")]
async fn find_all(
    query: web::Query<CluesRequest>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, CluesError> {
    let conn = &mut pool.acquire().await.context(CONTEXT_CONNECTION_ACQUIRE)?;

    let clues = match &query.search {
        None => Clue::find_all(conn).await.context("Failed to find clues")?,
        Some(search_query) => Clue::search(search_query, conn)
            .await
            .context("Failed to search clues")?,
    };

    Ok(HttpResponse::Ok().json(clues))
}

#[get("/clues/{id}")]
async fn find_by_id(
    id: web::Path<i32>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, CluesError> {
    let conn = &mut pool.acquire().await.context(CONTEXT_CONNECTION_ACQUIRE)?;

    let clue = Clue::find_by_id(id.into_inner(), conn)
        .await
        .context("Failed to find clue by ID")?;

    Ok(HttpResponse::Ok().json(clue))
}

#[post("/clues")]
async fn create(
    create_clue_dto: web::Json<CreateClueDto>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, CluesError> {
    let conn = &mut pool.acquire().await.context(CONTEXT_CONNECTION_ACQUIRE)?;

    let clue = Clue::create(create_clue_dto.into_inner(), conn)
        .await
        .context("Failed to create clue")?;

    Ok(HttpResponse::Ok().json(clue))
}

#[put("/clues/{id}")]
async fn update(
    id: web::Path<i32>,
    update_clue_dto: web::Json<UpdateClueDto>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, CluesError> {
    let conn = &mut pool.acquire().await.context(CONTEXT_CONNECTION_ACQUIRE)?;

    let clue = Clue::update(id.into_inner(), update_clue_dto.into_inner(), conn)
        .await
        .context("Failed to update clue")?;

    Ok(HttpResponse::Ok().json(clue))
}

#[delete("/clues/{id}")]
async fn delete(id: web::Path<i32>, pool: web::Data<PgPool>) -> Result<HttpResponse, CluesError> {
    let conn = &mut pool.acquire().await.context(CONTEXT_CONNECTION_ACQUIRE)?;

    let clue = Clue::delete(id.into_inner(), conn)
        .await
        .context("Failed to delete clue")?;

    Ok(HttpResponse::Ok().json(clue))
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(find_all);
    cfg.service(find_by_id);
    cfg.service(create);
    cfg.service(update);
    cfg.service(delete);
}
