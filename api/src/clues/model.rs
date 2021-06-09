use serde::{Deserialize, Serialize};
use sqlx::{Error, FromRow, PgConnection};

#[derive(Clone, Debug, FromRow, PartialEq, Serialize)]
pub struct Clue {
    pub id: i32,
    pub answer: String,
    pub clue: Option<String>,
    pub notes: Option<String>,
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct CreateClueDto {
    pub answer: String,
    pub clue: Option<String>,
    pub notes: Option<String>,
}

impl From<Clue> for CreateClueDto {
    fn from(clue: Clue) -> Self {
        CreateClueDto {
            answer: clue.answer,
            clue: clue.clue,
            notes: clue.notes,
        }
    }
}

#[derive(Clone, Debug, Deserialize, PartialEq, Serialize)]
pub struct UpdateClueDto {
    pub answer: Option<String>,
    pub clue: Option<String>,
    pub notes: Option<String>,
}

impl From<Clue> for UpdateClueDto {
    fn from(clue: Clue) -> Self {
        UpdateClueDto {
            answer: Some(clue.answer),
            clue: clue.clue,
            notes: clue.notes,
        }
    }
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

    pub async fn create(
        create_clue_dto: CreateClueDto,
        conn: &mut PgConnection,
    ) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "INSERT INTO api.clue (answer, clue, notes) VALUES ($1, $2, $3) RETURNING id, answer, clue, notes",
            create_clue_dto.answer,
            create_clue_dto.clue,
            create_clue_dto.notes,
        )
        .fetch_one(conn)
        .await;

        result
    }

    pub async fn update(
        id: i32,
        update_clue_dto: UpdateClueDto,
        conn: &mut PgConnection,
    ) -> Result<Clue, Error> {
        let result = sqlx::query_as!(
            Clue,
            "UPDATE api.clue SET answer = $2, clue = $3, notes = $4 WHERE id = $1 RETURNING id, answer, clue, notes",
            &id,
            update_clue_dto.answer,
            update_clue_dto.clue,
            update_clue_dto.notes,
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

    use super::*;

    async fn get_transaction<'a>() -> Transaction<'a, Postgres> {
        dotenv::from_filename(".env.test").ok();

        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let pool = PgPool::connect(&database_url).await.unwrap();

        pool.begin().await.unwrap()
    }

    #[actix_rt::test]
    async fn finds_all_clues() {
        let mut tx = get_transaction().await;

        let clues = Clue::find_all(&mut tx).await.unwrap();

        assert_eq!(clues.len(), 15);

        tx.rollback().await.unwrap();
    }

    #[actix_rt::test]
    async fn finds_clue_by_id() {
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

    #[actix_rt::test]
    async fn find_errors_with_nonexistent_id() {
        let mut tx = get_transaction().await;

        let result = Clue::find_by_id(0, &mut tx).await;

        assert!(result.is_err());

        tx.rollback().await.unwrap();
    }

    #[actix_rt::test]
    async fn creates_clue() {
        let mut tx = get_transaction().await;

        let create_clue_dto = CreateClueDto {
            answer: String::from("papa"),
            clue: Some(String::from("Father requiring pair of pears, oddly")),
            notes: Some(String::from("PAPA(ya)")),
        };

        let clue = Clue::create(create_clue_dto.clone(), &mut tx)
            .await
            .unwrap();

        assert_eq!(CreateClueDto::from(clue), create_clue_dto);

        tx.rollback().await.unwrap();
    }

    #[actix_rt::test]
    async fn updates_clue() {
        let mut tx = get_transaction().await;

        let update_clue_dto = UpdateClueDto {
            answer: Some(String::from("papa")),
            clue: Some(String::from("Father requiring pair of pears, oddly")),
            notes: Some(String::from("PAPA(ya)")),
        };

        let returning = Clue::update(1, update_clue_dto.clone(), &mut tx)
            .await
            .unwrap();

        assert_eq!(returning.id, 1);
        assert_eq!(UpdateClueDto::from(returning), update_clue_dto);

        tx.rollback().await.unwrap();
    }

    #[actix_rt::test]
    async fn update_errors_with_nonexistent_id() {
        let mut tx = get_transaction().await;

        let update_clue_dto = UpdateClueDto {
            answer: Some(String::from("papa")),
            clue: Some(String::from("Father requiring pair of pears, oddly")),
            notes: Some(String::from("PAPA(ya)")),
        };

        let result = Clue::update(0, update_clue_dto.clone(), &mut tx).await;

        assert!(result.is_err());

        tx.rollback().await.unwrap();
    }

    #[actix_rt::test]
    async fn deletes_clue() {
        let mut tx = get_transaction().await;

        let clue = Clue::find_by_id(1, &mut tx).await.unwrap();

        let result = Clue::delete(1, &mut tx).await.unwrap();

        assert_eq!(result, clue);

        tx.rollback().await.unwrap();
    }

    #[actix_rt::test]
    async fn delete_errors_with_nonexistent_id() {
        let mut tx = get_transaction().await;

        let result = Clue::delete(0, &mut tx).await;

        assert!(result.is_err());

        tx.rollback().await.unwrap();
    }
}
