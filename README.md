# API de Dispositivos Eletrônicos

API RESTful para cadastro e gerenciamento de dispositivos eletrônicos (smartphones, notebooks, fones, etc.), desenvolvida como atividade avaliativa da disciplina **Laboratório de Desenvolvimento Web (LDW)**.

**Tecnologias:** Node.js, Express, TypeScript, Sequelize (ORM), PostgreSQL (Supabase ou local), Swagger UI (OpenAPI) e CORS.

## Estrutura

```text
src/
├── config/
│   ├── database.ts      # Conexão Sequelize (SSL condicional via DB_SSL)
│   └── swagger.ts       # Configuração do Swagger (swagger-jsdoc)
├── models/
│   └── Dispositivo.ts   # Model tipado + interface DispositivoAttributes
├── controllers/
│   └── DispositivoController.ts   # CRUD, validações e tratamento de erros
├── routes/
│   └── dispositivoRoutes.ts       # Rotas (express.Router) + anotações Swagger
└── server.ts            # Ponto de entrada
```

## Modelo `Dispositivo`

| Campo | Tipo | Regra |
|---|---|---|
| id | INTEGER | Chave primária, auto incremento |
| nome | STRING | Obrigatório |
| marca | STRING | Obrigatório |
| categoria | STRING | Obrigatório |
| preco | DECIMAL(10,2) | Obrigatório, maior que 0 |
| estoque | INTEGER | Obrigatório, maior ou igual a 0 |
| ativo | BOOLEAN | Opcional, padrão `true` |
| createdAt / updatedAt | DATE | Gerados automaticamente |

A tabela `dispositivos` é criada automaticamente ao iniciar o servidor (`sequelize.sync()`).

## Endpoints

| Método | Rota | Descrição | Sucesso |
|---|---|---|---|
| GET | `/dispositivos` | Lista todos os dispositivos | 200 |
| GET | `/dispositivos/:id` | Busca um dispositivo por ID | 200 |
| POST | `/dispositivos` | Cria um dispositivo | 201 |
| PUT | `/dispositivos/:id` | Atualiza um dispositivo | 200 |
| DELETE | `/dispositivos/:id` | Remove um dispositivo | 200 |

Erros: `400` (dados ou ID inválidos), `404` (não encontrado) e `500` (erro interno).

## Como executar

### 1. Pré-requisitos
- Node.js 18 ou superior
- Um banco PostgreSQL: projeto no [Supabase](https://supabase.com) **ou** PostgreSQL local

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o exemplo e preencha com seus dados:
```bash
cp .env.example .env      # no Windows (cmd): copy .env.example .env
```

| Variável | Descrição |
|---|---|
| PORT | Porta do servidor (padrão 3000) |
| DB_HOST | Host do banco |
| DB_PORT | Porta do banco (5432) |
| DB_NAME | Nome do banco (`postgres`) |
| DB_USER | Usuário do banco |
| DB_PASSWORD | Senha do banco |
| DB_SSL | `true` para Supabase (nuvem), `false` para PostgreSQL local |

**Supabase:** no painel do projeto, clique em **Connect** e use a opção **Session pooler** (host `...pooler.supabase.com`, usuário `postgres.<ref-do-projeto>`). Use `DB_SSL=true`.

**PostgreSQL local:** `DB_HOST=localhost`, `DB_USER=postgres` e `DB_SSL=false`.

### 4. Rodar em desenvolvimento
```bash
npm run dev
```

### 5. Build e execução em produção
```bash
npm run build
npm start
```

## Documentação (Swagger)

Com o servidor em execução, acesse:

```text
http://localhost:3000/api-docs
```

Todos os endpoints podem ser testados com o botão **Try it out**.
