# API de Futebol

Uma api de informações de partidas de futebol.

## Sobre

A API permite criar usuários e buscar, criar, atualizar e finalizar partidas. Também conta com rankings dos times e sistemas de autorização e autenticação. Desenvolvida utilizando a arquitetura de camadas juntamento com orientação a objetos e SOLID.

## Como rodar

1. Suba os containers docker com o comando ```docker compose up -d```.
2. Agora é só esperar e fazer requisições as rotas da API como: ```http://localhost:3001/leaderboard```.

## Tecnologias utilizadas
- Node.js
- TypeScript
- Express.js
- Sequelize
- Bcrypt
- JSON WEB Token
- Mocha
- Chai
- Sinon

## Rotas

### Classificações

<details>
  <summary><code>GET /leaderboard</code>: retorna a classificação geral dos times</summary>
</details>

<details>
  <summary><code>GET /leaderboard/home</code>: retorna a classificação dos times da casa</summary>
</details>

<details>
  <summary><code>GET /leaderboard/away</code>: retorna a classificação dos times visitantes</summary>
</details>

### Partidas

<details>
  <summary><code>GET /matches</code>: retorna a lista de partidas</summary>
</details>

<details>
  <summary><code>POST /matches</code>: cadastra uma nova partida em andamento</summary>
  <br>
  <span>Exemplo de body da requisição:</span>
  
  <pre><code>
    {
      "homeTeamId": 16, // O valor deve ser o id do time
      "awayTeamId": 8, // O valor deve ser o id do time
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }
  </code></pre>
</details>

<details>
  <summary><code>PATCH /matches/:id</code>: atualiza os gols da partida em andamento</summary>
</details>

<details>
  <summary><code>PATCH /matches/:id/finish</code>: finaliza uma partida em andamento</summary>
</details>

### Times

<details>
  <summary><code>GET /teams</code>: retorna a lista de times</summary>
</details>

<details>
  <summary><code>GET /teams:id</code>: retorna um time específico através do id</summary>
</details>

### Login

<details>
  <summary><code>POST /login</code>: faz login em uma conta existente</summary>
</details>

<details>
  <summary><code>GET /login/role</code>: retorna o nível de acesso de um usuário através do token de autenticação</summary>
</details>
