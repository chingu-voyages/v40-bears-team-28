import { Pool } from 'pg'
import config from '../config'

let database: Pool

if (config.env === 'test') {
  database = new Pool({
    host: config.host,
    port: config.portDB,
    database: config.testDB,
    user: config.username,
    password: config.password
  })
} else {
  database = new Pool({
    host: config.host,
    port: config.portDB,
    database: config.db,
    user: config.username,
    password: config.password
  })
}

export default database