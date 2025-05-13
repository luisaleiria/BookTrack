exports.up = function(knex) {
  return knex.schema.createTable('livros', table => {
    table.increments('id').primary();
    // definir o tamanho máximo em string(100) já cria um CHECK implícito, mas não exige .checkLength()
    table.string('titulo', 100).notNullable();  
    table.string('autor').notNullable();
    table
      .enu('status', ['Quero Ler','Lendo','Lido'])
      .notNullable();
    table.integer('avaliacao');
    table.timestamp('data_conclusao');
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('livros');
};
