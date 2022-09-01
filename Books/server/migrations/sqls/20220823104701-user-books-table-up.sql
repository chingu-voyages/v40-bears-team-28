CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE user_books
(
    id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id    uuid REFERENCES users (id),
    book_id    uuid REFERENCES books (id),
    is_reading BOOLEAN NOT NULL,
    bookmarked BOOLEAN NOT NULL
);