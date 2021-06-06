use super::{Clue, CreateClueDto, UpdateClueDto};
use actix_web::{delete, get, patch, post, web, HttpResponse, Responder};
use sqlx::PgPool;

#[get("/clues")]
async fn find_all(pool: web::Data<PgPool>) -> impl Responder {
    let result = Clue::find_all(pool.get_ref()).await;

    match result {
        Ok(clues) => HttpResponse::Ok().json(clues),
        // TODO: response with `NotFound` etc.
        _ => HttpResponse::BadRequest().body("An error occurred."),
    }
}

#[get("/clues/{id}")]
async fn find_by_id(id: web::Path<i32>, pool: web::Data<PgPool>) -> impl Responder {
    let result = Clue::find_by_id(id.into_inner(), pool.get_ref()).await;

    match result {
        Ok(clue) => HttpResponse::Ok().json(clue),
        _ => HttpResponse::BadRequest().body("An error occurred."),
    }
}

#[post("/clues")]
async fn create(clue: web::Json<CreateClueDto>, pool: web::Data<PgPool>) -> impl Responder {
    let result = Clue::create(clue.into_inner(), pool.get_ref()).await;

    match result {
        Ok(clue) => HttpResponse::Ok().json(clue),
        _ => HttpResponse::BadRequest().body("An error occurred."),
    }
}

#[patch("/clues/{id}")]
async fn update(
    id: web::Path<i32>,
    clue: web::Json<UpdateClueDto>,
    pool: web::Data<PgPool>,
) -> impl Responder {
    let result = Clue::update(id.into_inner(), clue.into_inner(), pool.get_ref()).await;

    match result {
        Ok(clue) => HttpResponse::Ok().json(clue),
        _ => HttpResponse::BadRequest().body("An error occurred."),
    }
}

#[delete("/clues/{id}")]
async fn delete(id: web::Json<i32>, pool: web::Data<PgPool>) -> impl Responder {
    let result = Clue::delete(id.into_inner(), pool.get_ref()).await;

    match result {
        Ok(clue) => HttpResponse::Ok().json(clue),
        _ => HttpResponse::BadRequest().body("An error occurred."),
    }
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(find_all);
    cfg.service(find_by_id);
    cfg.service(create);
    cfg.service(update);
    cfg.service(delete);
}
