<h1 align="center">PureWorkspace</h1>

<p align="center">
  <img loading="lazy" src="docs\img\logo.png" alt="PureWorkspace Logo"/>
</p>

# Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Status do Projeto](#status-do-projeto)
- [Funcionalidades e Demonstração da Aplicação](#funcionalidades-e-demonstração-da-aplicação)
- [Acesso ao Projeto](#acesso-ao-projeto)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pessoas Contribuidoras](#pessoas-contribuidoras)
- [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras)
- [Licença](#licença)

## Descrição do Projeto

O **PureWorkspace** é um mono repositório desenvolvido com o objetivo de centralizar e otimizar o desenvolvimento de todas as nossas aplicações. Utilizando **React** com **Next.js** no front-end e **Nest.js** no back-end, ambos escritos em **TypeScript**, garantimos máxima reutilização de código e consistência entre as camadas.

Este projeto é gerenciado com o **NX**, permitindo uma organização eficiente e escalável baseada em uma arquitetura de bibliotecas e seguindo os princípios da **Clean Architecture**. Além disso, adotamos os fundamentos do **SOLID** para garantir um código modular, sustentável e de fácil manutenção.

Com o **PureWorkspace**, centralizamos o desenvolvimento do site **Pure Digital**, que apresenta nosso portfólio de produtos e serviços, além de um sistema interno para cadastro e gerenciamento de vendas, e da **API General**, nossa principal API com rotas reutilizáveis entre aplicações. Atualmente, o site conta com a tela de login pronta e a home page em desenvolvimento, enquanto a API já possui funcionalidades de login, cadastro de usuários e está expandindo com a API de disparo de e-mails.

## Status do Projeto

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## Funcionalidades e Demonstração da Aplicação

### :hammer: Funcionalidades do projeto

- `Autenticação JWT`: Gerenciamento de tokens de acesso e atualização.
- `Integração com PostgreSQL`: Banco de dados relacional para armazenamento de informações.
- `Cache com Redis`: Armazenamento temporário de dados para melhorar a performance.
- `Configuração de Ambiente`: Suporte a variáveis de ambiente para personalização e segurança.
- `Login Funcional`: Sistema de autenticação com tela de login pronta.
- `Home Page`: Página inicial em desenvolvimento.
- `Disparo de E-mails`: API para envio de e-mails em desenvolvimento.

## Acesso ao Projeto

Para acessar o projeto, clone o repositório e siga as instruções de configuração abaixo.

## Configuração de Ambiente

Este projeto utiliza variáveis de ambiente para configurar diferentes aspectos da aplicação. Para configurar o ambiente:

1. Certifique-se de ter o **Docker** e o **npm** instalados em sua máquina.
2. Crie um arquivo `.env` na raiz do projeto.
3. Consulte a documentação de variáveis de ambiente em [ENVIRONMENT.md](./docs/ENVIRONMENT.md).
4. Preencha as variáveis de acordo com as instruções fornecidas.
5. Execute `npm i` para instalar todas as dependências do projeto.
6. Inicie o banco de dados PostgreSQL e o Redis com o comando: `docker:postgres`.
7. Gere os arquivos do Prisma com o comando: `prisma:generate:general`.
8. Execute as migrações do banco de dados com o comando: `prisma:migrate:general`.
9. Para iniciar o back-end, utilize o comando: `start:server-pure-general`.
10. Para iniciar o front-end, utilize o comando: `start:web-pure-digital`.

## Tecnologias Utilizadas

- Node.js
- PostgreSQL
- Redis
- JWT (JSON Web Token)
- Docker (opcional, para ambiente de desenvolvimento)
- NX
- Next.js
- Nest.js

## Pessoas Contribuidoras

- [Erick da Silva Celestino](https://github.com/ErickCelestino)
- [José Samuel Pereira](https://github.com/PuraFome)

## Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).
