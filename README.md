<h1 align="center">Visualização de Repositórios do GitHub🚀</h1>

> O projeto é uma integração com a API GraphQL do GitHub.

## :page_facing_up: Explicação

Você tera um campo de pesquisa onde colocará o nome de qualquer repositório, ele vai fazer a listagem dos primeiros 50.

Mais abaixo você poderá carregar mais, caso necessário que ele vai carregar mais 50...

A listagem vai mostrar o nome do repositório, nome do proprietário e uma breve descrição do projeto, caso ouver.

Ao clicar em algum card, você verá um modal abrir e ele vai carregar mais informações daquele repositório, como: foto, quantidadee de commits, issues abertar, pull-requests abertos, estrelas ganhas e a data da criação.

## :dart: Passos

:heavy_check_mark: Componente Header;\
:heavy_check_mark: Componente Input;\
:heavy_check_mark: Criação do card de listagem;\
:heavy_check_mark: Conexão com a API do GitHub;\
:heavy_check_mark: Salvar resultado da api;\
:heavy_check_mark: Mapear os dados e colocar no card;\
:heavy_check_mark: Criação do modal;\
:heavy_check_mark: Exibir um repositório específico;\
:heavy_check_mark: Implementação do Redux;\
:heavy_check_mark: Criação dos states;\
:heavy_check_mark: Responsividade;\
:heavy_check_mark: Melhorias nas funções de listagem;\
:heavy_check_mark: Componente de ícone;

## :rocket: Tecnologias

As seguintes ferramentas foram utilizadas neste projeto:

- [NextJs](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [LucideIcons](https://lucide.dev/guide/packages/lucide-react)
- [GitHub GraphQL](https://docs.github.com/en/graphql)
- [TailwindCSS](https://tailwindcss.com/)

## :closed_book: Requisitos ##

Antes de começar, você precisa ter [Git](https://git-scm.com) e [Node](https://nodejs.org/en/) instalados em seu computador.
Crie um token pessoal no GitHub, informações em: <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens">GitHub Chaves Pessoais</a>

## :checkered_flag: Getting Started ##

```bash
# Clone o projeto
$ git clone https://github.com/LucasMauricio1/github-graphQL
# Accesso
$ cd github-graphQL
# Instalando dependencias
$ yarn ou npm i
# crie um arquivo .env.local na raiz do seu projeto e cole o seguinte:
$ NEXT_PUBLIC_GITHUB_TOKEN=sua_chave_privada
# rode o comando
$ yarn dev ou npm run dev
# O servidor iniciará na porta: <http://localhost:3000>
```
## 🤝 Contribuidores

Queremos agradecer às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/122059282?s=400&u=96bc9300d660f1b489efcfb0a557ab08a6298c99&v=4" width="100px;" alt="Lucas Mauricio"/><br>
        <sub>
          <b>Lucas Maurício</b>
        </sub>
      </a>
    </td>
  </tr>
</table>