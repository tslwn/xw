use super::{Clue, CreateClueDto, UpdateClueDto};
use crate::api_result::ApiResult;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use sqlx::PgPool;

#[get("/clues")]
async fn find_all(pool: web::Data<PgPool>) -> ApiResult<impl Responder> {
    let clues = Clue::find_all(&mut *pool.acquire().await?).await?;

    Ok(HttpResponse::Ok().json(clues))
}

#[get("/clues/{id}")]
async fn find_by_id(id: web::Path<i32>, pool: web::Data<PgPool>) -> ApiResult<impl Responder> {
    let clue = Clue::find_by_id(id.into_inner(), &mut *pool.acquire().await?).await?;

    Ok(HttpResponse::Ok().json(clue))
}

#[post("/clues")]
async fn create(
    clue: web::Json<CreateClueDto>,
    pool: web::Data<PgPool>,
) -> ApiResult<impl Responder> {
    let clue = Clue::create(clue.into_inner(), &mut *pool.acquire().await?).await?;

    Ok(HttpResponse::Ok().json(clue))
}

#[put("/clues/{id}")]
async fn update(
    id: web::Path<i32>,
    clue: web::Json<UpdateClueDto>,
    pool: web::Data<PgPool>,
) -> ApiResult<impl Responder> {
    let clue = Clue::update(
        id.into_inner(),
        clue.into_inner(),
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
