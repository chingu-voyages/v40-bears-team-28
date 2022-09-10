# Requirements to Run Server side

## Tech Needed to install

- [Node](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)
- [Redis](https://redis.io/docs/getting-started/installation/)

## Dependencies

- typescript
- Express
- helmet
- cors
- pg
- db-migrate
- db-migrate-pg
- dotenv
- jsonwebtoken
- bcrypt
- jasmine
- jasmine Spec Reporter
- supertest

## Setting up Database

1. **Update .env file with those variables**

```
    PORT=4000
    ENV=dev
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_DB=books
    POSTGRES_TEST_DB=books_test
    POSTGRES_USERNAME=YOUR-DATABASE-USERNAME
    POSTGRES_PASSWORD=YOUR-DATABASE-PASSWORD
    BCRYPT_PASSWORD=YOUR-BCRYPT-PASSWORD
    SALT_ROUNDS=10
    AUTH_SECRET=YOUR-SECRET
    RESET_PASSWORD_SECRET=YOUR-SECRET
    COOKIE_SECRET=YOUR-SECRET
```

2. **Create User**

```postgresql
CREATE USER dany WITH PASSWORD 'dany245';
```

3. **Create Database**

```postgresql
CREATE DATABASE books;
CREATE DATABASE books_test;
```

4. **Grant all privileges to both databases**

```postgresql
GRANT ALL PRIVILEGES ON DATABASE books TO dany;
GRANT ALL PRIVILEGES ON DATABASE books_test TO dany;
```
5. **Install all dependencies**
```
cd Books/server
npm install
```
6. **Run db migrate to create all necessary tables for database**

```
cd Books/server
db-migrate up
```

# Data Shapes For Tables

### Users

- `id - UUID`
- `username - VARCHAR`
- `email - VARCHAR`
- `image - VARCHAR`
- `is_verified - BOOLEAN`
- `password - VARCHAR`

### Books

- `id - UUID`
- `book_id - VARCHAR`
- `title - VARCHAR`
- `authors - VARCHAR`
- `description - TEXT`
- `publisher - VARCHAR`
- `pages - INTEGER`
- `year - INTEGER`
- `image - VARCHAR`
- `url - VARCHAR`

### User Books

- `id - UUID`
- `user_id - UUID`
- `book_id - VARCHAR`
