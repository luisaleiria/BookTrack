import { Request, Response } from 'express';
import { di } from '../di'; 
import { UsuarioService } from '../services/usuario.service';

export const cadastrarUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {nome, email} = req.body;
        if (!nome || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios' });
        }
        if (typeof nome === 'string' && nome.length < 3) {
            return res.status(400).json({ error: 'Nome deve ter pelo menos 3 caracteres' });
        }
        if (typeof email === 'string' && !email.includes('@')) {
            return res.status(400).json({ error: 'Email inválido' });
        }
        const usuarioService = di.getService(UsuarioService);
        const usuario = await usuarioService.cadastrarUsuario(nome as string, email as string);
        return res.status(201).json(usuario);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const listarUsuarios = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const usuarioService = di.getService(UsuarioService);
        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const excluirUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório' });
        }

        const usuarioService = di.getService(UsuarioService);
        await usuarioService.excluirUsuario(id);
        return res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}