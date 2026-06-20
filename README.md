# Blog Roles API

API backend para um sistema de blog com autenticação, autorização por cargos e gerenciamento de posts.

O projeto possui controle de acesso baseado em três tipos de usuário:

- `reader`: usuário comum, pode visualizar posts publicados.
- `editor`: pode criar e gerenciar seus próprios posts.
- `director`: pode gerenciar todos os posts e alterar cargos de usuários.

---

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- Sequelize CLI
- JWT
- bcryptjs
- Zod
- dotenv
- CORS
- Docker

---

## Arquitetura

O projeto segue uma arquitetura em camadas:

```txt
Controller → Service → Repository → Model
```

### Controllers

Responsáveis por receber as requisições HTTP, extrair dados de `params`, `body` e `user`, chamar os services e retornar as respostas.

### Services

Responsáveis pelas regras de negócio, validações, permissões e montagem das respostas.

### Repositories

Responsáveis pela comunicação direta com o banco de dados usando Sequelize.

### Validators

Responsáveis pela validação dos dados de entrada usando Zod.

### Middlewares

Responsáveis por autenticação, autorização e tratamento global de erros.

---

## Estrutura de Pastas

```txt
src/
  config/
    database.js
    sequelize-cli.cjs

  controllers/
    auth.controller.js
    user.controller.js
    post.controller.js

  database/
    migrations/
    seeders/
    package.json

  middlewares/
    auth.middleware.js
    role.middleware.js
    global-error.middleware.js

  models/
    User.js
    Post.js
    index.js

  repositories/
    user.repository.js
    post.repository.js

  routes/
    auth.routes.js
    user.routes.js
    post.routes.js
    manage-post.routes.js

  services/
    auth.service.js
    user.service.js
    post.service.js

  utils/
    AppError.js

  validators/
    auth.validator.js
    user.validator.js
    post.validator.js

  app.js

server.js
docker-compose.yml
.sequelizerc
```

---

## Models

## User

Representa os usuários da aplicação.

### Campos principais

```txt
id
name
email
passwordHash
role
createdAt
updatedAt
```

### Roles

```txt
reader
editor
director
```

### Regras

- Todo usuário cadastrado pela rota pública recebe a role `reader`.
- Apenas usuários com role `director` podem alterar cargos.
- A senha é salva como hash usando `bcryptjs`.

---

## Post

Representa os posts do blog.

### Campos principais

```txt
id
title
content
authorId
published
createdAt
updatedAt
```

### Regras

- Todo post é criado inicialmente com `published: false`.
- Posts publicados aparecem nas rotas públicas.
- Posts não publicados aparecem apenas nas rotas privadas de gerenciamento.
- `editor` gerencia apenas seus próprios posts.
- `director` gerencia todos os posts.

---

## Relacionamentos

```txt
User hasMany Post
Post belongsTo User
```

### Chave estrangeira

```txt
posts.authorId → users.id
```

### Alias

```txt
User.hasMany(Post, { as: "posts" })
Post.belongsTo(User, { as: "author" })
```

As respostas de posts retornam o autor no formato:

```json
{
  "author": {
    "id": 1,
    "name": "Nome do autor"
  }
}
```

---

## Variáveis de Ambiente

Exemplo de `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=blog_roles
DB_USER=root
DB_PASS=root

JWT_SECRET=sua_chave_secreta

ADMIN_NAME=Admin
ADMIN_EMAIL=admin@email.com
ADMIN_PASS=123456
```

---

## Como Rodar o Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir o banco com Docker

```bash
docker compose up -d
```

### 3. Rodar migrations

```bash
npx sequelize-cli db:migrate
```

### 4. Rodar seed do usuário director

```bash
npx sequelize-cli db:seed:all
```

### 5. Iniciar o servidor

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

---

## Autenticação

A autenticação é feita com JWT.

O token deve ser enviado no header:

```txt
Authorization: Bearer <token>
```

O middleware de autenticação valida o token e adiciona os dados do usuário autenticado em `req.user`.

---

## Tratamento de Erros

A API utiliza uma classe `AppError` para erros controlados e um middleware global para padronizar as respostas.

### Tipos de erro

```txt
400 → erro de validação
401 → não autenticado
403 → sem permissão
404 → recurso não encontrado
409 → conflito de dados
500 → erro interno inesperado
```

---

# Rotas

## Auth

Base:

```txt
/api/auth
```

### Cadastro

```txt
POST /api/auth/register
```

Cria um novo usuário com role padrão `reader`.

Body esperado:

```json
{
  "name": "Nome do usuário",
  "email": "usuario@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

---

### Login

```txt
POST /api/auth/login
```

Autentica o usuário e retorna um token JWT.

Body esperado:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

## Users

Base:

```txt
/api/users
```

### Perfil do usuário autenticado

```txt
GET /api/users/me
```

Requer autenticação.

---

### Alterar role de usuário

```txt
PATCH /api/users/:id/role
```

Requer autenticação e role `director`.

Body esperado:

```json
{
  "role": "editor"
}
```

Roles permitidas:

```txt
reader
editor
director
```

---

## Posts Públicos

Base:

```txt
/api/posts
```

### Listar posts publicados

```txt
GET /api/posts
```

Rota pública.

Retorna apenas posts com:

```txt
published: true
```

---

### Buscar post publicado por ID

```txt
GET /api/posts/:id
```

Rota pública.

Retorna apenas posts publicados.

Se o post não existir ou não estiver publicado, retorna `404`.

---

### Criar post

```txt
POST /api/posts
```

Requer autenticação e role:

```txt
editor
director
```

Body esperado:

```json
{
  "title": "Título válido do post",
  "content": "Conteúdo do post com tamanho suficiente para passar na validação."
}
```

Regras:

```txt
title mínimo de 12 caracteres
content mínimo de 50 caracteres
```

O post é criado com:

```txt
published: false
```

---

## Gerenciamento de Posts

Base:

```txt
/api/manage/posts
```

Todas as rotas exigem autenticação e role:

```txt
editor
director
```

---

### Listar posts não publicados

```txt
GET /api/manage/posts
```

Regras:

```txt
director → lista todos os posts não publicados
editor   → lista apenas seus próprios posts não publicados
```

---

### Buscar post não publicado por ID

```txt
GET /api/manage/posts/:id
```

Regras:

```txt
director → acessa qualquer post não publicado
editor   → acessa apenas seus próprios posts não publicados
```

---

### Editar post

```txt
PATCH /api/manage/posts/:id
```

Body aceito:

```json
{
  "title": "Novo título válido",
  "content": "Novo conteúdo válido com tamanho suficiente."
}
```

Regras:

```txt
director → edita qualquer post
editor   → edita apenas seus próprios posts
```

Os campos `title` e `content` são opcionais, mas pelo menos um deles precisa ser enviado.

---

### Publicar post

```txt
PATCH /api/manage/posts/:id/publish
```

Define:

```txt
published: true
```

Regras:

```txt
director → publica qualquer post
editor   → publica apenas seus próprios posts
```

---

### Despublicar post

```txt
PATCH /api/manage/posts/:id/unpublish
```

Define:

```txt
published: false
```

Regras:

```txt
director → despublica qualquer post
editor   → despublica apenas seus próprios posts
```

---

### Deletar post

```txt
DELETE /api/manage/posts/:id
```

Remove fisicamente o post do banco.

Regras:

```txt
director → deleta qualquer post
editor   → deleta apenas seus próprios posts
```

---

# Formato das Respostas de Posts

As respostas de posts seguem o formato:

```json
{
  "id": 1,
  "title": "Título do post",
  "content": "Conteúdo do post",
  "author": {
    "id": 2,
    "name": "Nome do autor"
  },
  "published": true,
  "createdAt": "2026-06-20T00:00:00.000Z",
  "updatedAt": "2026-06-20T00:00:00.000Z"
}
```

---

# Regras de Permissão

## Reader

Pode:

```txt
visualizar posts publicados
```

Não pode:

```txt
criar posts
editar posts
deletar posts
publicar posts
despublicar posts
gerenciar usuários
```

---

## Editor

Pode:

```txt
criar posts
visualizar posts publicados
visualizar seus próprios posts não publicados
editar seus próprios posts
publicar seus próprios posts
despublicar seus próprios posts
deletar seus próprios posts
```

Não pode:

```txt
editar posts de outros autores
deletar posts de outros autores
publicar posts de outros autores
despublicar posts de outros autores
alterar roles de usuários
```

---

## Director

Pode:

```txt
visualizar posts publicados
visualizar todos os posts não publicados
criar posts
editar qualquer post
publicar qualquer post
despublicar qualquer post
deletar qualquer post
alterar roles de usuários
```

---

# Funcionalidades Implementadas

```txt
Configuração inicial do Express
Configuração do Sequelize
Configuração do MySQL com Docker
Migrations de users e posts
Seed inicial de usuário director
Cadastro de usuários
Login com JWT
Middleware de autenticação
Middleware de autorização por role
Middleware global de erros
Validação com Zod
Alteração de roles por director
Criação de posts por editor/director
Listagem pública de posts publicados
Busca pública de post publicado por ID
Listagem privada de posts não publicados
Busca privada de post não publicado por ID
Publicação de posts
Despublicação de posts
Edição de posts
Delete físico de posts
Retorno de posts com dados básicos do autor
Collection organizada no Insomnia
```

---
