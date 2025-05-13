// src/controllers/livro.controller.ts

import { Request, Response, NextFunction } from 'express';
import { di } from '../di';
import { LivroService } from '../services/livro.service';

const livroService = di.getService(LivroService);

export const cadastrarLivro = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    const livro = await livroService.cadastrarLivro(
      Number(userId),
      req.body
    );
    res.status(201).json(livro);
  } catch (err: any) {
    next(err);
  }
};

export const listarLivros = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    const livros = await livroService.listarLivros(Number(userId));
    res.status(200).json(livros);
  } catch (err: any) {
    next(err);
  }
};

export const buscarLivroPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const livro = await livroService.IdLivro(id, Number(userId));
    res.status(200).json(livro);
  } catch (err: any) {
    next(err);
  }
};

export const atualizarLivro = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    const livroAtualizado = await livroService.updateLivro(
      id,
      Number(userId),
      req.body
    );
    res.status(200).json(livroAtualizado);
  } catch (err: any) {
    next(err);
  }
};

export const deletarLivro = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      res.status(400).json({ error: 'ID do usuário é obrigatório' });
      return;
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    await livroService.deletarLivro(id, Number(userId));
    res.sendStatus(204);
  } catch (err: any) {
    next(err);
  }
};
