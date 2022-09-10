CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE books
(
    id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    book_id     VARCHAR UNIQUE NOT NULL,
    title       VARCHAR       NOT NULL,
    authors     VARCHAR(100)  NOT NULL,
    description TEXT          NOT NULL,
    publisher   VARCHAR       NOT NULL,
    pages       INTEGER       NOT NULL,
    year        INTEGER       NOT NULL,
    image       VARCHAR       NOT NULL,
    url         VARCHAR       NOT NULL
);
