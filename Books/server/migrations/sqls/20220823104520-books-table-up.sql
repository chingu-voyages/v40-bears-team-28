CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE books
(
    id                uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title             VARCHAR NOT NULL,
    description       TEXT    NOT NULL,
    publisher         VARCHAR NOT NULL,
    publish_year      INTEGER NOT NULL,
    pages             INTEGER NOT NULL,
    avg_rating        FLOAT   NOT NULL,
    cover             VARCHAR NOT NULL,
    currently_reading INTEGER NOT NULL
);
