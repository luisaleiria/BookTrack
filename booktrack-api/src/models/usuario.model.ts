import BaseModel from './base.model';

export default class UsuarioModel extends BaseModel {
    id!: string;
    nome: string;
    email: string;

    constructor(data: UsuarioModel) {
        super(data.id);
        this.nome = data.nome;
        this.email = data.email;
    }
}