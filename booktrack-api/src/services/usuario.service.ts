import connection from '../database/connection';
import UsuarioModel from '../models/usuario.model';

export class UsuarioService {

    async cadastrarUsuario(nome: string, email: string): Promise<UsuarioModel> {
        // Verifica se o email já está cadastrado antes de inserir
        const emailInserido = await connection('usuarios').where({ email }).first();
        if (emailInserido) {
            throw new Error('Email já cadastrado');
        }
        // Insere o usuário no banco de dados e retorna o ID
        const id = await connection('usuarios')
            .insert({ nome, email })
            .returning('id')
            .then(ids => ids[0]);

        // Cria uma instância de UsuarioModel
        const usuario = new UsuarioModel({ id, nome, email });
        return usuario;
    }

    async listarUsuarios(): Promise<UsuarioModel[]> {
        const usuarios = await connection('usuarios').select('*');
        return usuarios.map((usuario: any) => new UsuarioModel(usuario));
    }

    async excluirUsuario(id: string): Promise<void> {
        const usuario = await connection('usuarios').where({ id }).first();
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await connection('usuarios').where({ id }).delete();
    }
}