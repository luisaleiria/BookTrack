import BaseModel from './base.model';

export default class UsuarioModel extends BaseModel {
    id!: string;
    nome: string;
    email: string;

    constructor({ id, nome, email }: { id?: string; nome: string; email: string }) {
        super(id ?? '');
        this.nome = nome;
        this.email = email;
    }
}