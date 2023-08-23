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

  <br>
  <span>Exemplo de resposta</span>
  <pre><code>
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      {
        "name": "Santos",
        "totalPoints": 11,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 12,
        "goalsOwn": 6,
        "goalsBalance": 6,
        "efficiency": "73.33"
      },
    ]
  </code></pre>
</details>

<details>
  <summary><code>GET /leaderboard/home</code>: retorna a classificação dos times da casa</summary>

  <br>
  <span>Exemplo de resposta</span>
  <pre><code>
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      {
        "name": "Santos",
        "totalPoints": 11,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 12,
        "goalsOwn": 6,
        "goalsBalance": 6,
        "efficiency": "73.33"
      },
    ]
  </code></pre>
</details>

<details>
  <summary><code>GET /leaderboard/away</code>: retorna a classificação dos times visitantes</summary>

  <br>
  <span>Exemplo de resposta</span>
  <pre><code>
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      {
        "name": "Santos",
        "totalPoints": 11,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 12,
        "goalsOwn": 6,
        "goalsBalance": 6,
        "efficiency": "73.33"
      },
    ]
  </code></pre>
</details>

### Partidas

<details>
  <summary><code>GET /matches</code>: retorna a lista de partidas</summary>

  <br>
  <span>Exemplo de resposta:</span>
  <pre><code>
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
    ]
  </code></pre>
</details>

<details>
  <summary><code>POST /matches</code>: cadastra uma nova partida em andamento</summary>
  <br>
  <span>Exemplo de body da requisição:</span>
  
  <pre><code>
    {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 1,
      "awayTeamGoals": 2,
    }
  </code></pre>

  <span>Exemplo de resposta:</span>
  <pre><code>
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    }
  </code></pre>
</details>

<details>
  <summary><code>PATCH /matches/:id</code>: atualiza os gols da partida em andamento</summary>

  <br>
  <span>Exemplo de body da requisição:</span>
  
  <pre><code>
    {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }
  </code></pre>

  <span>Exemplo de resposta:</span>
  <pre><code>
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 3,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
    }
  </code></pre>
</details>

<details>
  <summary><code>PATCH /matches/:id/finish</code>: finaliza uma partida em andamento</summary>

  <br>
  
  <span>Exemplo de resposta:</span>
  <pre><code>
    { "message": "Finished" }
  </code></pre>
</details>

### Times

<details>
  <summary><code>GET /teams</code>: retorna a lista de times</summary>

  <br>

  <span>Exemplo de resposta:</span>
  <pre><code>
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ]
  </code></pre>
</details>

<details>
  <summary><code>GET /teams:id</code>: retorna um time específico através do id</summary>

  <br>

  <span>Exemplo de resposta:</span>
  <pre><code>
    {
      "id": 5,
      "teamName": "Cruzeiro"
    }
  </code></pre>
</details>

### Login

<details>
  <summary><code>POST /login</code>: faz login em uma conta existente</summary>

  <br>

  <br>
  <span>Exemplo de body da requisição:</span>
  
  <pre><code>
    {
      "email": "string",
      "password": "string"
    }
  </code></pre>

  <span>Exemplo de resposta:</span>
  <pre><code>
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm1szSI6ImFkbWluIiwiawF5IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_ghSshxrpIdigit-fc"
    }
  </code></pre>
</details>

<details>
  <summary><code>GET /login/role</code>: retorna o nível de acesso de um usuário através do token de autenticação</summary>
  
  <br>
  <span>Exemplo de resposta:</span>
  <pre><code>
    { "role": "admin" }
  </code></pre>
</details>
