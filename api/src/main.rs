use actix_web::{web, App, HttpServer};
use anyhow::{Context, Result};
use sqlx::PgPool;

#[path = "clues/mod.rs"]
mod clues;

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();

    let api_url = std::env::var("API_URL").expect("API_URL must be set");

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPool::connect(&database_url)
        .await
        .context("Failed to create connection pool")?;

    let _server = HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .service(web::scope("/api").configure(clues::init))
    })
    .bind(&api_url)?
    .run()
    .await
    .context("Failed to start listening for incoming connections")?;

    Ok(())
}
