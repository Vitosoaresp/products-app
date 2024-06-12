# Gerenciamento de Produtos - Interface com Next.js

## Visão Geral

Este projeto é uma aplicação front-end desenvolvida com [Next.js](https://nextjs.org/), destinada ao gerenciamento de produtos. A aplicação oferece funcionalidades para listar, adicionar, editar e remover produtos. Utilizamos uma combinação de ferramentas modernas como [shadcn/ui](https://shadcn.dev), [TailwindCSS](https://tailwindcss.com/), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) para validação, [Axios](https://axios-http.com/) para requisições HTTP, e [TanStack React Query](https://tanstack.com/query/latest) para gerenciamento de dados e estado assíncrono.

## Funcionalidades

- **Listar Produtos**: Exibir uma lista paginada de todos os produtos.
- **Adicionar Produto**: Formulário para adicionar novos produtos.
- **Editar Produto**: Editar detalhes de um produto existente.
- **Remover Produto**: Remover produtos da listagem.
- **Autenticação**: Páginas de login e registro para acesso seguro à aplicação.

## Navegação e Rotas

### `/products`

- **Descrição**: Página principal de listagem de produtos.
- **Funcionalidades**:
  - Exibir lista paginada de produtos.
  - Barra de busca para filtrar produtos por nome ou categoria.
  - Botão para adicionar novo produto que abre um modal com um formulário.
  - Deletar um produto
  - Visualizar um produto

### `/products/[slug]`

- **Descrição**: Página de visualização e edição de um produto específico.
- **Funcionalidades**:
  - Visualizar detalhes do produto selecionado.
  - Editar informações do produto.
  - Salvar alterações no produto.

### `/sign-in`

- **Descrição**: Página de login para usuários.
- **Funcionalidades**:
  - Formulário de login com campos de e-mail e senha.
  - Validação de entrada de dados.
  - Autenticação do usuário.

### `/register`

- **Descrição**: Página de registro para novos usuários.
- **Funcionalidades**:
  - Formulário de registro com campos para nome, e-mail e senha.
  - Validação de entrada de dados.
  - Criação de nova conta de usuário.

## Ferramentas e Tecnologias

### Estrutura do Projeto

- **Next.js**: Framework de React para renderização do lado do servidor e geração estática.
- **React Hook Form**: Biblioteca para criação de formulários e gerenciamento de estado de formulário.
- **Zod**: Biblioteca para validação de esquemas e manipulação de dados.
- **shadcn/ui + TailwindCSS**: Framework para componentes UI com utilitários CSS.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **TanStack React Query**: Biblioteca para gerenciamento de estado assíncrono e cache de dados.

### Configuração e Dependências

1. **Instalar Dependências**:

   Execute o comando abaixo para instalar todas as dependências necessárias:

   ```bash
   pnpm install
   ```

2. **Executar a Aplicação**:

   Utilize o comando abaixo para iniciar a aplicação em modo de desenvolvimento:

   ```bash
   pnpm dev
   ```

   A aplicação estará disponível em `http://localhost:3000`.

3. **Configuração de Ambiente**:

   Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias:

   ```plaintext
   NEXT_PUBLIC_API_URL=http://localhost:3333
   ```

4. **Construir para Produção**:

   Para gerar os arquivos de produção, execute:

   ```bash
   pnpm build
   ```

## Detalhes dos Componentes

### Formulários e Validação

Os formulários são construídos utilizando `React Hook Form` para gerenciamento de estado e `Zod` para validação de dados.

- **React Hook Form**: Facilita a manipulação de formulários complexos com um código simples e conciso.
- **Zod**: Utilizado para definir esquemas de validação e garantir que os dados de entrada estejam no formato esperado.

### Estilização

A estilização da aplicação é feita com `TailwindCSS` e componentes de `shadcn/ui`.

- **TailwindCSS**: Permite a aplicação rápida de estilos utilitários diretamente nas classes dos componentes.
- **shadcn/ui**: Utilizado para componentes de UI consistentes e customizáveis.

### Gerenciamento de Estado e Requisições

Para o gerenciamento de estado assíncrono e requisições à API, utilizamos `TanStack React Query` e `Axios`.

- **Axios**: Cliente HTTP usado para realizar requisições à API de backend.
- **React Query**: Gerencia o estado dos dados obtidos através de requisições, oferecendo caching e refetching automáticos.


## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch: `git checkout -b minha-nova-funcionalidade`.
3. Faça suas modificações e adicione commits: `git commit -m 'Adiciona nova funcionalidade'`.
4. Envie para o repositório remoto: `git push origin minha-nova-funcionalidade`.
5. Abra um pull request para revisão.
