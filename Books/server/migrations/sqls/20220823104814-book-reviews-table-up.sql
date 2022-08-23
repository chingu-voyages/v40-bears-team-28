CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE book_reviews
(
    id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id    uuid REFERENCES users (id),
    book_id    uuid REFERENCES books (id),
    created_at TIMESTAMP NOT NULL,
    content    TEXT      NOT NULL,
    rate       INTEGER   NOT NULL
);