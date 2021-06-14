ALTER TABLE api.clue ADD COLUMN document tsvector GENERATED ALWAYS
AS (to_tsvector('english', answer || ' ' || coalesce(clue, '') || ' ' || coalesce(notes, ''))) STORED;

CREATE INDEX clue_document_idx ON api.clue USING GIN (document);
