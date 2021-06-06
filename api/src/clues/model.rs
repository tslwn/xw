use serde::{Deserialize, Serialize};
use sqlx::{Error, FromRow, PgPool};

#[derive(FromRow, Serialize)]
pub struct Clue {
    pub id: i32,
    pub answer: String,
    pub clue: Option<String>,
    pub notes: Option<String>,
}

#[derive(Deserialize, Serialize)]
pub struct CreateClueDto {
    pub answer: String,
    pub clue: Option<String>,
    pub notes: Option<String>,
}

#[derive(Deserialize, Serialize)]
pub struct UpdateClueDto {
    pub answer: Option<String>,
    pub clue: Option<String>,
    pub notes: Option<String>,
}

impl Clue {
    pub async fn find_all(pool: &PgPool) -> Result<Vec<Clue>, Error> {
        let result = sqlx::query_as!(
            Clue,
            "SELECT id, answer, clue, notes FROM api.clue ORDER BY id"
        )
        .fetch_all(pool)
        .await;

        result
    }

    pub async fn find_by_id(id: i32, pool: &PgPool) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "SELECT id, answer, clue, notes FROM api.clue WHERE id = $1",
            &id
        )
        .fetch_one(pool)
        .await;

        result
    }

    pub async fn create(clue: CreateClueDto, pool: &PgPool) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "INSERT INTO api.clue (answer, clue, notes) VALUES ($1, $2, $3) RETURNING id, answer, clue, notes",
            clue.answer,
            clue.clue,
            clue.notes,
        )
        .fetch_one(pool)
        .await;

        result
    }

    pub async fn update(id: i32, clue: UpdateClueDto, pool: &PgPool) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "UPDATE api.clue SET answer = COALESCE($2, answer), clue = COALESCE($3, clue), notes = COALESCE($4, notes) WHERE id = $1 RETURNING id, answer, clue, notes",
            &id,
            clue.answer,
            clue.clue,
            clue.notes,
        )
        .fetch_one(pool)
        .await;

        result
    }

    pub async fn delete(id: i32, pool: &PgPool) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "DELETE FROM api.clue WHERE id = $1 RETURNING id, answer, clue, notes",
            &id,
        )
        .fetch_one(pool)
        .await;

        result
    }
}
