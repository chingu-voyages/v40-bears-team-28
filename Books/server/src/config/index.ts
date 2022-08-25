import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_TIMES,
  AUTH_SECRET,
  RESET_PASSWORD_SECRET
} = process.env

export default {
  port: parseInt(PORT as string, 10),
  env: ENV,
  host: POSTGRES_HOST,
  portDB: parseInt(POSTGRES_PORT as string, 10),
  db: POSTGRES_DB,
  testDB: POSTGRES_TEST_DB,
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  pepper: BCRYPT_PASSWORD,
  salt: parseInt(SALT_TIMES as string, 10),
  authSecret: AUTH_SECRET,
  resetPasswordSecret: RESET_PASSWORD_SECRET
}