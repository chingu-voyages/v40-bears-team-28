CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
    id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username    VARCHAR(100) NOT NULL,
    email       VARCHAR      NOT NULL UNIQUE,
    image       VARCHAR      NOT NULL,
    is_verified BOOLEAN      NOT NULL,
    password    VARCHAR      NOT NULL
);