import connection from '../database/connection';

export interface CadastrarLivroData {
  titulo: string;
  autor: string;
  status: 'Quero Ler' | 'Lendo' | 'Lido';
  avaliacao?: number;
}

export class LivroService {
  async cadastrarLivro(userId: number, data: CadastrarLivroData) {
    const { titulo, autor, status, avaliacao } = data;

    if (!titulo || titulo.length < 3 || titulo.length > 100) {
      throw new Error('Título inválido');
    }
    if (!['Quero Ler', 'Lendo', 'Lido'].includes(status)) {
      throw new Error('Status inválido');
    }
    if (status === 'Lido' && (avaliacao === undefined || avaliacao < 1 || avaliacao > 5)) {
      throw new Error('Avaliação inválida para livro lido');
    }

    const dataConclusao = status === 'Lido' ? new Date().toISOString() : null;

    // Insere e obtém o ID do novo registro
    const [insertedId] = await connection('livros')
      .insert({ titulo, autor, status, avaliacao, data_conclusao: dataConclusao, user_id: userId });

    // Retorna o registro criado
    return await connection('livros')
      .where({ id: insertedId })
      .first();
  }

  async listarLivros(userId: number) {
    return await connection('livros')
      .where({ user_id: userId })
      .select('*');
  }

  async buscarLivroPorId(id: number, userId: number) {
    const livro = await connection('livros')
      .where({ id, user_id: userId })
      .first();

    if (!livro) {
      throw new Error('Livro não encontrado ou não pertence ao usuário.');
    }
    return livro;
  }

  async atualizarLivro(id: number, userId: number, data: CadastrarLivroData) {
    const existing = await connection('livros')
      .where({ id, user_id: userId })
      .first();
    if (!existing) throw new Error('Livro não encontrado ou não pertence ao usuário.');
    if (existing.status === 'Lido') throw new Error('Livros lidos não podem ser editados.');

    const { titulo, autor, status, avaliacao } = data;
    if (!titulo || titulo.length < 3 || titulo.length > 100) {
      throw new Error('Título inválido');
    }
    if (!['Quero Ler', 'Lendo', 'Lido'].includes(status)) {
      throw new Error('Status inválido');
    }
    if (status === 'Lido' && (avaliacao === undefined || avaliacao < 1 || avaliacao > 5)) {
      throw new Error('Avaliação inválida para livro lido');
    }

    const dataConclusao = status === 'Lido' ? new Date().toISOString() : null;

    await connection('livros')
      .where({ id })
      .update({ titulo, autor, status, avaliacao, data_conclusao: dataConclusao });

    return await connection('livros')
      .where({ id })
      .first();
  }

  async deletarLivro(id: number, userId: number) {
    const livro = await connection('livros')
      .where({ id, user_id: userId })
      .first();
    if (!livro) {
      throw new Error('Livro não encontrado ou não pertence ao usuário.');
    }

    await connection('livros')
      .where({ id })
      .delete();

    return livro;
  }
}
