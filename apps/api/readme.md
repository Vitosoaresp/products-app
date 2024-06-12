# API de Gerenciamento de Produtos

Este projeto é uma API RESTful desenvolvida com NodeJS e NestJS para o gerenciamento de produtos. A API permite realizar operações de CRUD (Create, Read, Update, Delete) em produtos, com validação de dados, autenticação JWT e integração com o MongoDB usando Mongoose. A seguir, você encontrará uma documentação detalhada das rotas disponíveis na API, bem como informações sobre autenticação, conexão com o banco de dados e aplicação de princípios de desenvolvimento.

## Índice
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Swagger](#documentação)
- [Rotas da API](#rotas-da-api)
  - [Adicionar Produto](#post-products)
  - [Listar Produtos](#get-products)
  - [Detalhes do Produto](#get-productsid)
  - [Atualizar Produto](#put-productsid)
  - [Remover Produto](#delete-productsid)
- [Validação e Autenticação](#validação-e-autenticação)
- [Banco de Dados](#banco-de-dados)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Vitosoaresp/products-app
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd products-app
   ```

3. Instale as dependências:
   ```bash
   pnpm install
   ```

## Configuração

> Caso tenha docker instalado rode o script pnpm db:setup para subir um container docker com o mongodb 

1. Crie um arquivo `.env` na raiz da pasta api do projeto com as seguintes variáveis:
   ```plaintext
   DATABASE_URL=mongodb://localhost:27017/seu-banco-de-dados
   JWT_SECRET=sua-chave-secreta
   PORT=porta-da-api
   ```

2. Inicie o servidor:
   ```bash
   cd apps/api && pnpm dev
   ```

## Documentação

A API possui documentação gerada automaticamente usando Swagger, facilitando a exploração e o entendimento dos endpoints disponíveis. A documentação pode ser acessada pela rota `/docs`.

### Acesso à Documentação

- **URL:** `/docs`
- **Descrição:** A documentação Swagger fornece uma interface interativa para testar os endpoints da API e visualizar informações detalhadas sobre cada um deles, incluindo os parâmetros esperados, respostas possíveis e exemplos de requisições.

#### Exemplo de Acesso

1. Inicie a aplicação com o comando:
   ```bash
   pnpm dev
   ```

2. Acesse a URL:
   ```plaintext
   http://localhost:3333/docs
   ```

3. A interface Swagger será carregada, permitindo que você explore e teste os endpoints disponíveis na API.

## Rotas da API

### POST /products

- **Descrição:** Adiciona um novo produto.
- **URL:** `/products`
- **Método:** `POST`
- **Autenticação:** JWT
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do Produto",
    "description": "Descrição do Produto",
    "price": 100,
    "category": "Categoria do Produto",
    "code": 90,
    "quantity": 10
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
    "id": "60d5c4792f8fb814c89f5c98",
    "name": "Nome do Produto",
    "slug": "nome-do-produto",
    "description": "Descrição do Produto",
    "price": 100,
    "category": "Categoria do Produto",
    "quantity": 10,
    "code": 90,
    "createdAt": "2024-06-11T10:00:00.000Z",
    "updatedAt": "2024-06-11T10:00:00.000Z",
    "deletedAt": null
  }
  ```
- **Exemplo de Requisição:**
  ```bash
  curl -X POST http://localhost:3000/products \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer seu-token-jwt" \
    -d '{"name":"Nome do Produto","description":"Descrição do Produto","price":100,"category":"Categoria","quantity":10,"code":90}'
  ```

### GET /products

- **Descrição:** Lista todos os produtos.
- **URL:** `/products`
- **Método:** `GET`
- **Autenticação:** Não requerida
- **Resposta de Sucesso:**
  ```json
  {
    total: 2,
    data: [
      {
        "id": "60d5c4792f8fb814c89f5c98",
        "name": "Nome do Produto",
        "slug": "nome-do-produto",
        "description": "Descrição do Produto",
        "price": 100,
        "category": "Categoria do Produto",
        "quantity": 10,
        "code": 90,
        "createdAt": "2024-06-11T10:00:00.000Z",
        "updatedAt": "2024-06-11T10:00:00.000Z",
        "deletedAt": null
      },
      {
        "id": "60d5c4792f8fb814c89f5c98",
        "name": "Outro Produto",
        "slug": "outro-produto",
        "description": "Outra Descrição do Produto",
        "price": 50,
        "category": "Categoria do Produto",
        "quantity": 1,
        "code": 1,
        "createdAt": "2024-06-11T10:00:00.000Z",
        "updatedAt": "2024-06-11T10:00:00.000Z",
        "deletedAt": null
      }
    ]
  }
  ```
- **Exemplo de Requisição:**
  ```bash
  curl -X GET http://localhost:3000/products
  ```

### GET /products/:slug

- **Descrição:** Obtém detalhes de um produto específico.
- **URL:** `/products/:slug`
- **Método:** `GET`
- **Autenticação:** Não requerida
- **Parâmetros da URL:** `slug` (SLUG do produto)
- **Resposta de Sucesso:**
  ```json
  {
      "id": "60d5c4792f8fb814c89f5c98",
      "name": "Nome do Produto",
      "slug": "nome-do-produto",
      "description": "Descrição do Produto",
      "price": 100,
      "category": "Categoria do Produto",
      "quantity": 10,
      "code": 90,
      "createdAt": "2024-06-11T10:00:00.000Z",
      "updatedAt": "2024-06-11T10:00:00.000Z",
      "deletedAt": null
  }
  ```
- **Exemplo de Requisição:**
  ```bash
  curl -X GET http://localhost:3000/products/nome-do-produto
  ```

### PUT /products/:slug

- **Descrição:** Atualiza informações de um produto.
- **URL:** `/products/:slug`
- **Método:** `PUT`
- **Autenticação:** JWT
- **Parâmetros da URL:** `slug` (SLUG do produto)
- **Corpo da Requisição:**
  ```json
  {
    "name": "Nome do Produto",
    "description": "Descrição do Produto",
    "price": 100,
    "category": "Categoria do Produto",
    "code": 90,
    "quantity": 10
  }
  ```
- **Resposta de Sucesso:**
  ```json
  {
      "id": "60d5c4792f8fb814c89f5c98",
      "name": "Nome do Produto",
      "slug": "nome-do-produto",
      "description": "Descrição do Produto",
      "price": 100,
      "category": "Categoria do Produto",
      "quantity": 10,
      "code": 90,
      "createdAt": "2024-06-11T10:00:00.000Z",
      "updatedAt": "2024-06-11T10:00:00.000Z",
      "deletedAt": null
  }
  ```
- **Exemplo de Requisição:**
  ```bash
  curl -X PUT http://localhost:3000/products/60d5c4792f8fb814c89f5c98 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer seu-token-jwt" \
    -d '{"name":"Nome do Produto","description":"Descrição do Produto","price":100,"category":"Categoria","quantity":10,"code":90}'
  ```

### DELETE /products/:slug

- **Descrição:** Remove um produto.
- **URL:** `/products/:slug`
- **Método:** `DELETE`
- **Autenticação:** JWT
- **Parâmetros da URL:** `slug` (SLUG do produto)
- **Exemplo de Requisição:**
  ```bash
  curl -X DELETE http://localhost:3000/products/nome-do-produto \
    -H "Authorization: Bearer seu-token-jwt"
  ```

## Validação e Autenticação

### Validação de Dados

A API utiliza o Zod, uma biblioteca de validação de esquemas, em conjunto com Pipes personalizados do NestJS para validar as entradas de dados. Isso assegura que os dados recebidos estão no formato correto antes de serem processados pela aplicação.

### Autenticação JWT

As rotas (/products) estão protegidas por autenticação JWT. Para acessar essas rotas, é necessário fornecer um token válido no cabeçalho da requisição.

## Banco de Dados

A API está conectada a um banco de dados MongoDB, utilizando o Mongoose para definição dos esquemas e manipulação dos dados. Certifique-se de que o MongoDB
