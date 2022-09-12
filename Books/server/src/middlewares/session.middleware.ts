import session, { SessionData } from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import config from '../config'

// Adding user type to session
declare module 'express-session' {
  interface SessionData {
    user?: any
  }
}

export const redisClient = new Redis({
  host: config.redisHost as string,
  port: config.redisPort as unknown as number
})
const RedisStore = connectRedis(session)

export const sessionMiddleware = session({
  secret: config.cookieSecret as string,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: config.env === 'production ' ? true : 'auto',
    httpOnly: true,
    sameSite: config.env === 'production' ? 'none' : 'lax'
  }
})

export const corsConfig = {
  origin: 'https://books-hut.netlify.app/',
  credentials: true
}
