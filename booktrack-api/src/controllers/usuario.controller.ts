import { Request, Response, NextFunction } from 'express';
import { di } from '../di'; 
import { UsuarioService } from '../services/usuario.service';

export const cadastrarUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      res.status(400).json({ error: 'Nome e email são obrigatórios' });
      return;
    }
    if (typeof nome === 'string' && nome.length < 3) {
      res.status(400).json({ error: 'Nome deve ter pelo menos 3 caracteres' });
      return;
    }
    if (typeof email === 'string' && !email.includes('@')) {
      res.status(400).json({ error: 'Email inválido' });
      return;
    }

    const usuarioService = di.getService(UsuarioService);
    const usuario = await usuarioService.cadastrarUsuario(nome, email);

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    next(error);
  }
};

export const listarUsuarios = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usuarioService = di.getService(UsuarioService);
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    next(error);
  }
};

export const excluirUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    const usuarioService = di.getService(UsuarioService);
    await usuarioService.excluirUsuario(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    next(error);
  }
};
