import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import errorMiddleware from './middlewares/error.middleware';
import { corsConfig, sessionMiddleware } from './middlewares/session.middleware';
import pageNotFoundMiddleware from './middlewares/pageNotFound.middleware';


const PORT = config.port || 4000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));
// Get response in json format
app.use(express.json());
// Allow cors
app.use(cors(corsConfig));
// setting HTTP headers to protect express app
app.use(helmet());
// Using cookie to store user credentials
app.use(sessionMiddleware);

app.use('/', routes);

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
  });
});

app.use(errorMiddleware);
app.use(pageNotFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server is starting at http://localhost:${PORT}`);
});

export default app;
