import { Express, Router } from 'express';
import { cadastrarUsuario, listarUsuarios, excluirUsuario } from '../controllers/usuario.controller';

export default (app: Express) => {
  const router = Router();

  // router.post('/usuarios', cadastrarUsuario);
  // router.get('/usuarios', listarUsuarios);
  // router.delete('/usuarios/:id', excluirUsuario);

  // Registra o router com o prefixo '/api'
  app.use('/api', router);
};