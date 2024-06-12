# Produtos App - Monorepo com TurboRepo

## Visão Geral

Este monorepo é gerenciado pelo [TurboRepo](https://turborepo.org/) e contém uma aplicação full-stack para gerenciamento de produtos. Ele inclui um backend com uma API RESTful construída com [NestJS](https://nestjs.com/) e um frontend para interface de usuário construído com [Next.js](https://nextjs.org/).

## Estrutura do Monorepo

A estrutura do monorepo é organizada para facilitar a navegação e a manutenção de múltiplos projetos relacionados. Aqui está uma visão geral dos diretórios principais e suas funcionalidades:

```
/products-app
│
├── /apps
│   ├── /api              # Aplicação backend com NestJS
│   └── /web         # Aplicação frontend com Next.js
│
├── /config
│   └── /eslint           # Configurações eslint
│   └── /tsconfig         # Typescript configs
│   └── /prettier         # Configurações do prettier
|
├── /packages
│   ├── /schemas          # Definições de esquemas com Mongoose e validação com Zod
│
│
├── /node_modules         # Módulos npm instalados
│
├── /turbo.json           # Configuração do TurboRepo
│
├── /package.json         # Dependências e scripts de npm para o monorepo
│
└── /README.md            # Documentação principal do monorepo
```

## Configuração e Dependências

1. **Instalar Dependências**:

   Execute o comando abaixo na raiz do monorepo para instalar todas as dependências necessárias para todos os pacotes e aplicações:

   ```bash
   pnpm install
   ```

2. **Configuração de Ambiente**:

   Verifique em cada diretorio (api / web) as configurações de variaveis de ambiente

3. **Executar Aplicação**:

   Use os seguintes comandos para iniciar as aplicações em modo de desenvolvimento:

   ```bash
   turbo dev
   ```

   As aplicações estarão disponíveis nas URLs correspondentes:
   - API: `http://localhost:3333`
   - Frontend: `http://localhost:3000`
  
## Fotos

![Captura de tela de 2024-06-12 01-03-35](https://github.com/Vitosoaresp/products-app/assets/23152592/30037131-0638-4339-9af8-cfb59aed07b0)
![Captura de tela de 2024-06-12 01-03-16](https://github.com/Vitosoaresp/products-app/assets/23152592/8beced87-0a7e-4835-96d4-d5e85b99ff2f)
![Captura de tela de 2024-06-12 01-03-50](https://github.com/Vitosoaresp/products-app/assets/23152592/57dd1b49-ad50-48df-8736-3469a9e60e19)


## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b minha-nova-funcionalidade`.
3. Faça suas modificações e adicione commits: `git commit -m 'Adiciona nova funcionalidade'`.
4. Envie para o repositório remoto: `git push origin minha-nova-funcionalidade`.
5. Abra um pull request para revisão.
