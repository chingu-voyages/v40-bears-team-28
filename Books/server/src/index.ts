import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'


const PORT = config.port || 4000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
// Get response in json format
app.use(express.json())
// Allow cors
app.use(cors())
// setting HTTP headers to protect express app
app.use(helmet())

app.use('/', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
