import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('API is working!');
});

export default routes;