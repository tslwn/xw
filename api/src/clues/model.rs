use serde::{Deserialize, Serialize};
use sqlx::{Error, FromRow, PgConnection};

#[derive(Debug, FromRow, PartialEq, Serialize)]
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
    pub async fn find_all(conn: &mut PgConnection) -> Result<Vec<Clue>, Error> {
        let result = sqlx::query_as!(
            Clue,
            "SELECT id, answer, clue, notes FROM api.clue ORDER BY id"
        )
        .fetch_all(conn)
        .await;

        result
    }

    pub async fn find_by_id(id: i32, conn: &mut PgConnection) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "SELECT id, answer, clue, notes FROM api.clue WHERE id = $1",
            &id
        )
        .fetch_one(conn)
        .await;

        result
    }

    pub async fn create(clue: CreateClueDto, conn: &mut PgConnection) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "INSERT INTO api.clue (answer, clue, notes) VALUES ($1, $2, $3) RETURNING id, answer, clue, notes",
            clue.answer,
            clue.clue,
            clue.notes,
        )
        .fetch_one(conn)
        .await;

        result
    }

    pub async fn update(
        id: i32,
        clue: UpdateClueDto,
        conn: &mut PgConnection,
    ) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "UPDATE api.clue SET answer = $2, clue = $3, notes = $4 WHERE id = $1 RETURNING id, answer, clue, notes",
            &id,
            clue.answer,
            clue.clue,
            clue.notes,
        )
        .fetch_one(conn)
        .await;

        result
    }

    pub async fn delete(id: i32, conn: &mut PgConnection) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "DELETE FROM api.clue WHERE id = $1 RETURNING id, answer, clue, notes",
            &id,
        )
        .fetch_one(conn)
        .await;

        result
    }
}

#[cfg(test)]
mod tests {
    use sqlx::{PgPool, Postgres, Transaction};

    use super::Clue;

    async fn get_transaction<'a>() -> Transaction<'a, Postgres> {
        dotenv::from_filename(".env.test").ok();

        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let pool = PgPool::connect(&database_url).await.unwrap();

        pool.begin().await.unwrap()
    }

    #[actix_rt::test]
    async fn it_finds_clue_by_id() {
        let mut tx = get_transaction().await;

        let id = 1;

        let clue = Clue::find_by_id(id, &mut tx).await.unwrap();

        assert_eq!(
            clue,
            Clue {
                id: id,
                answer: String::from("carroty"),
                clue: Some(String::from("Orange books in lift")),
                notes: Some(String::from("CARR<O(ld)/T(estament)>Y")),
            }
        );

        tx.rollback().await.unwrap();
    }
}
