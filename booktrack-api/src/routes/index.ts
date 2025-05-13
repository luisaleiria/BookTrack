import { Express, Router } from 'express';
import { cadastrarUsuario, listarUsuarios, excluirUsuario } from '../controllers/usuario.controller';
import {cadastrarLivro,listarLivros,buscarLivroPorId,atualizarLivro,deletarLivro} from '../controllers/livro.controller';


export default (app: Express) => {
  const router = Router();

  router.post('/usuarios', cadastrarUsuario);
  router.get('/usuarios', listarUsuarios);
  router.delete('/usuarios/:id', excluirUsuario);
  router.post('/livros', cadastrarLivro);
  router.get('/livros', listarLivros);
  router.get('/livros/:id', buscarLivroPorId);
  router.put('/livros/:id', atualizarLivro);
  router.delete('/livros/:id', deletarLivro);

  // Registra o router com o prefixo '/api'
  app.use('/api', router);
};