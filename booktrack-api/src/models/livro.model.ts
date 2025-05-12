import BaseModel from './base.model';

export default class LivroModel extends BaseModel {
    id!: string;
    titulo: string;
    autor: string;
    status: string;
    avaliacao: number;
    data_conclusao: Date;

    constructor(data: LivroModel) {
        super(data.id);
        this.titulo = data.titulo;
        this.autor = data.autor;
        this.status = data.status;
        this.avaliacao = data.avaliacao;
        this.data_conclusao = data.data_conclusao;
    }
}