import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loadRoutes from './routes';
import { di } from './di';
import { UsuarioService } from './services/usuario.service';
import { LivroService } from './services/livro.service';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

// Registra os serviços antes de usá-los
di.register(UsuarioService);
di.register(LivroService);

// Carrega as rotas
loadRoutes(app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});