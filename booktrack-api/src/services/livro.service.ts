const Book = require('../models/livro.model');

interface cadastrarLivroData {
    titulo: string;
    autor: string;
    status: 'Quero Ler' | 'Lendo' | 'Lido';
    avaliacao?: number;
}

export class LivroService {
async cadastrarLivro(userId: number, data: cadastrarLivroData): Promise<typeof Book> {
    const { titulo, autor, status, avaliacao } = data;

    if (!titulo || titulo.length < 3 || titulo.length > 100) {
        throw new Error('Título inválido');
    }

    if (!['Quero Ler', 'Lendo', 'Lido'].includes(status)) {
        throw new Error('Status inválido');
    }

    if (status === 'Lido' && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
        throw new Error('Avaliação inválida para livro lido');
    }

    const dataConclusao = status === 'Lido' ? new Date() : null;

    const livro = await Book.create({ titulo, autor, status, avaliacao, data_conclusao: dataConclusao, user_id: userId });
    return livro;
}

listarLivros = async (userId: number) => {
  return await Book.findAll({ where: { user_id: userId } });
};

IdLivro = async (id: number, userId: number) => {
  const livro = await Book.findOne({ where: { id, user_id: userId } });
  if (!livro) {
    throw new Error('Livro não encontrado ou não pertence ao usuário.');
  }
  return livro;
};

updateLivro = async (id: number, userId: number, data: cadastrarLivroData) => {
  const livro = await Book.findOne({ where: { id, user_id: userId } });
  if (!livro) throw new Error('Livro não encontrado ou não pertence ao usuário.');

  if (livro.status === 'Lido') throw new Error('Livros lidos não podem ser editados.');

  const { titulo, autor, status, avaliacao } = data;

  if (!titulo || titulo.length < 3 || titulo.length > 100) {
    throw new Error('Título inválido');
  }

  if (!['Quero Ler', 'Lendo', 'Lido'].includes(status)) {
    throw new Error('Status inválido');
  }

  if (status === 'Lido' && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
    throw new Error('Avaliação inválida para livro lido');
  }

  const dataConclusao = status === 'Lido' ? new Date() : null;

  return await livro.update({ titulo, autor, status, avaliacao, data_conclusao: dataConclusao });
};

deletarLivro = async (id: number, userId: number) => {
  const livro = await Book.findOne({ where: { id, user_id: userId } });
  if (!livro) throw new Error('Livro não encontrado ou não pertence ao usuário.');
  await livro.destroy();
}
};
export default LivroService;