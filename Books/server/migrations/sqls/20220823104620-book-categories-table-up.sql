CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE book_categories
(
    id       uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    book_id  uuid REFERENCES books (id),
    category VARCHAR NOT NULL
);