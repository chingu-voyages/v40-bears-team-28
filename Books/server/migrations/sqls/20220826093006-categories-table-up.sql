CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE categories
(
    id       uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    category VARCHAR NOT NULL
);