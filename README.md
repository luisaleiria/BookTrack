# BookTrack

API RESTful para gerenciamento de leituras pessoais.  
Permite cadastrar usuários e seus livros nos status “Quero Ler”, “Lendo” e “Lido”, com avaliação e data de conclusão.

---

## 📋 Tecnologias

- **Node.js**  
- **TypeScript**  
- **Express**  
- **SQLite** (via Knex)  
- **Knex** (migrations & query builder)  
- **ts-node-dev** (hot-reload para desenvolvimento)  
- **Thunder Client / Postman** (para testes de API)

---

## 🚀 Pré-requisitos

- [Node.js v16+](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  
- (Opcional) [DB Browser for SQLite](https://sqlitebrowser.org/) para visualizar o banco  

---

## 💾 Como executar o projeto

1. **Clone o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/BookTrack.git
   cd BookTrack/booktrack-api
2. **Instale as dependências**
   ```bash
   npm install
   #ou
   yarn
3. **Crie o banco e rode as migrations**
   ```bash
    # se seu knexfile se chama knexfile.cjs, especifique-o:
    npx knex migrate:latest --knexfile knexfile.cjs
    # ou apenas:
    npx knex migrate:latest
4. **Inicie o servidor**
   ```bash
   npm i
   npm start

## 🚦 Testando com Thunder Client

Para facilitar seus primeiros testes, siga estes passos no **Thunder Client** (extensão do VS Code):

1. **Abra o Thunder Client**  
   Clique no ícone de raio na barra lateral do VS Code e escolha **New Collection**, dê um nome (ex.: `BookTrack API`).

2. **Listar Usuários**  
   - **Method**: `GET`  
   - **URL**: `http://localhost:3333/api/usuarios`  
   - **Headers**:  
     | Key      | Value             |
     | -------- | ----------------- |
     | `Accept` | `application/json`|  
   - **Send** → HTTP 200 e retorna um array de usuários.

3. **Cadastrar Usuário**  
   - **Method**: `POST`  
   - **URL**: `http://localhost:3333/api/usuarios`  
   - **Headers**:  
     | Key            | Value             |
     | -------------- | ----------------- |
     | `Content-Type` | `application/json`|  
   - **Body (JSON)**:
     ```json
     {
       "nome": "João Silva",
       "email": "joao2.silva@example.com"
     }
     ```
   - **Send** → HTTP 201 e retorna o JSON do usuário criado.

4. **Excluir Usuário**  
   - **Method**: `DELETE`  
   - **URL**: `http://localhost:3333/api/usuarios/<id>`  
     _(ex: `/api/usuarios/3`)_  
   - **Send** → HTTP 204 No Content.

---

5. **Cadastrar Livro**  
   - **Method**: `POST`  
   - **URL**: `http://localhost:3333/api/livros`  
   - **Headers**:  
     | Key            | Value             |
     | -------------- | ----------------- |
     | `Content-Type` | `application/json`|
     | `user-id`      | `13`              | _(ou envie `userId` no body)_  
   - **Body (JSON)**:
     ```json
     {
       "userId": 13,
       "titulo": "Clean Code",
       "autor": "Robert C. Martin",
       "status": "Lido",
       "avaliacao": 5
     }
     ```
   - **Send** → HTTP 201 e retorna o JSON do livro criado.

6. **Listar Livros**  
   - **Method**: `GET`  
   - **URL**: `http://localhost:3333/api/livros`  
   - **Headers**:  
     | Key       | Value |
     | --------- | ----- |
     | `user-id` | `13`  |  
   - **Send** → HTTP 200 e retorna um array de livros do usuário.

7. **Buscar Livro por ID**  
   - **Method**: `GET`  
   - **URL**: `http://localhost:3333/api/livros/<id>`  
     _(ex: `/api/livros/5`)_  
   - **Headers**:  
     | Key       | Value |
     | --------- | ----- |
     | `user-id` | `13`  |
   - **Send** → HTTP 200 e retorna o JSON do livro.

8. **Atualizar Livro**  
   - **Method**: `PUT`  
   - **URL**: `http://localhost:3333/api/livros/<id>`  
     _(ex: `/api/livros/5`)_  
   - **Headers**:  
     | Key            | Value             |
     | -------------- | ----------------- |
     | `Content-Type` | `application/json`|
     | `user-id`      | `13`              |
   - **Body (JSON)**:
     ```json
     {
       "titulo": "Clean Code (2ª edição)",
       "autor": "Robert C. Martin",
       "status": "Lido",
       "avaliacao": 5
     }
     ```
   - **Send** → HTTP 200 e retorna o JSON do livro atualizado.

9. **Excluir Livro**  
   - **Method**: `DELETE`  
   - **URL**: `http://localhost:3333/api/livros/<id>`  
     _(ex: `/api/livros/5`)_  
   - **Headers**:  
     | Key       | Value |
     | --------- | ----- |
     | `user-id` | `13`  |
   - **Send** → HTTP 204 No Content.

> 💡 **Dica:** Salve cada requisição na coleção **BookTrack API** e ajuste o `<id>` e o `user-id` conforme os registros gerados no seu banco.

## 📘 Livros

| Método | Rota              | Descrição                                          |
| ------ | ----------------- | -------------------------------------------------- |
| POST   | `/api/livros`     | Cadastra um livro (recebe `userId`, `titulo`, ...) |
| GET    | `/api/livros`     | Lista livros de um usuário                         |
| GET    | `/api/livros/:id` | Busca um livro pelo `id`                           |
| PUT    | `/api/livros/:id` | Atualiza um livro (valida regras de negócio)       |
| DELETE | `/api/livros/:id` | Exclui um livro                                    |

## 👤 Usuários

| Método | Rota                | Descrição                   |
| ------ | ------------------- | --------------------------- |
| POST   | `/api/usuarios`     | Cadastra um novo usuário    |
| GET    | `/api/usuarios`     | Lista todos os usuários     |
| DELETE | `/api/usuarios/:id` | Exclui um usuário pelo `id` |

--- 

## 📁 Estrutura do projeto
 ```bash
BookTrack/
├─ src/
│  ├─ controllers/        # Camada de entrada (Express handlers)
│  ├─ services/           # Regras de negócio
│  ├─ database/
│  │  ├─ connection.ts    # Configuração do Knex
│  │  ├─ migrations/      # Arquivos de criação de tabelas
│  │  └─ seeds/           # Dados iniciais (opcional)
│  ├─ di.ts               # Container de injeção de dependências
│  ├─ routes.ts           # Definição de rotas
│  └─ server.ts           # Boot do Express
├─ knexfile.js            # Configuração de ambientes Knex
├─ package.json
├─ tsconfig.json
└─ README.md              # Este arquivo

