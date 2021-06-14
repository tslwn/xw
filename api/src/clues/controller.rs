use super::{Clue, CreateClueDto, UpdateClueDto};
use crate::api_result::ApiResult;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use serde::Deserialize;
use sqlx::PgPool;

#[derive(Debug, Deserialize)]
pub struct CluesRequest {
    search_query: Option<String>,
}

#[get("/clues")]
async fn find_all(
    query: web::Query<CluesRequest>,
    pool: web::Data<PgPool>,
) -> ApiResult<impl Responder> {
    let conn = &mut *pool.acquire().await?;

    let clues = match &query.search_query {
        None => Clue::find_all(conn).await?,
        Some(search_query) => Clue::search(search_query, conn).await?,
    };

    Ok(HttpResponse::Ok().json(clues))
}

#[get("/clues/{id}")]
async fn find_by_id(id: web::Path<i32>, pool: web::Data<PgPool>) -> ApiResult<impl Responder> {
    let clue = Clue::find_by_id(id.into_inner(), &mut *pool.acquire().await?).await?;

    Ok(HttpResponse::Ok().json(clue))
}

#[post("/clues")]
async fn create(
    create_clue_dto: web::Json<CreateClueDto>,
    pool: web::Data<PgPool>,
) -> ApiResult<impl Responder> {
    let clue = Clue::create(create_clue_dto.into_inner(), &mut *pool.acquire().await?).await?;

    Ok(HttpResponse::Ok().json(clue))
}

#[put("/clues/{id}")]
async fn update(
    id: web::Path<i32>,
    update_clue_dto: web::Json<UpdateClueDto>,
    pool: web::Data<PgPool>,
) -> ApiResult<impl Responder> {
    let clue = Clue::update(
        id.into_inner(),
        update_clue_dto.into_inner(),
        &mut *pool.acquire().await?,
    )
    .await?;

    Ok(HttpResponse::Ok().json(clue))
}

#[delete("/clues/{id}")]
async fn delete(id: web::Path<i32>, pool: web::Data<PgPool>) -> ApiResult<impl Responder> {
    let clue = Clue::delete(id.into_inner(), &mut *pool.acquire().await?).await?;

    Ok(HttpResponse::Ok().json(clue))
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(find_all);
    cfg.service(find_by_id);
    cfg.service(create);
    cfg.service(update);
    cfg.service(delete);
}
