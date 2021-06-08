use actix_web::{web, App, HttpServer};
use anyhow::Result;
use sqlx::PgPool;
mod api_result;

#[path = "clues/mod.rs"]
mod clues;

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();

    let api_url = std::env::var("API_URL").expect("API_URL must be set");

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPool::connect(&database_url).await?;

    let _server = HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .service(web::scope("/api").configure(clues::init))
    })
    .bind(&api_url)?
    .run()
    .await?;

    Ok(())
}
