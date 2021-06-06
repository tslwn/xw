#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE xw;

    \c xw

    CREATE SCHEMA api;

    CREATE SCHEMA flyway;

    CREATE USER api WITH PASSWORD '$(cat $API_PASSWORD)';

    GRANT USAGE ON SCHEMA api TO api;

    CREATE USER flyway WITH PASSWORD '$(cat $FLYWAY_PASSWORD)';

    GRANT ALL ON SCHEMA api TO flyway;

    GRANT ALL ON SCHEMA flyway TO flyway;
EOSQL
