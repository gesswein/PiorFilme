## Instruções
- Para clonar o repositório
> git clone https://github.com/gesswein/PiorFilme.git
- Para Instalar as dependências do projeto
> npm install
- Para executar os testes de integração
> npm test
- Para executar a aplicação, que estará rodando em: http://localhost:3000
> npm start

# Sobre a aplicação

Desenvolvida aplicação que ao iniciada, lê um arquivo CSV e importa os dados para oa database(SQLITE) em memória.
 - Caso queira alterar os dados, deve ser substituido o arquivo no diretório a seguir, utilizando o mesmo nome de arquivo: 
 > ./src/attachment/movielist.csv

A aplicação possui a camada de API com as seguintes rotas
- GET /api/movies
- GET /api/movies/movies/getById?id=
- GET /api/movies/worstproducer
- POST /movies
- PUT /movies/updateById?id=
- DELETE /movies/deleteById?id=

