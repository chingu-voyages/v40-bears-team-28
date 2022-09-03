import { Request, Router, Response } from 'express';
import { usersRoutes, userBooksRoutes } from './api';

const routes = Router();

routes.use('/api', usersRoutes);
routes.use('/api', userBooksRoutes);

routes.get('/api', (req: Request, res: Response) => {
  res.send('Hello from api');
});

export default routes;