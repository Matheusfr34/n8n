# Projeto Custom Node n8n - Random

Este projeto foi proposto pela empresa OnFly. O objetivo é criar um conector personalizado para a plataforma de automação n8n.
Ele contém um **conector personalizado** para o [n8n](https://n8n.io), chamado **Random**, que utiliza a API [Random.org](https://www.random.org/) para gerar números aleatórios, assim como foi pedido no desafio.

---

## Funcionalidade
O conector **Random** possui uma única operação:

- **True Random Number Generator**  
  Gera um número inteiro aleatório entre um **mínimo (Min)** e um **máximo (Max)**.

---

## Tecnologias utilizadas
- **Node.js 22 LTS**
- **TypeScript**
- **Docker**
- **Docker Compose**
- **PostgreSQL (banco de dados para o n8n)**

---

## Pré-requisitos de instalação

Antes de rodar o projeto, instale:

1. **Node.js (22 LTS):**  
   [Download Node.js](https://nodejs.org/)

   Verifique a instalação:  
   ```bash
   node --version
   npm --version
   ```

2. **Docker:**  
   [Instalar Docker](https://docs.docker.com/get-docker/)

   Verifique se está funcionando:
   ```bash
   docker -v
   ```

4. **Docker Compose:**  
   Já vem embutido em versões recentes do Docker, mas você pode confirmar:  
   ```bash
   docker compose version
   ```

---

## Desenvolvendo o Custom Node
1. Clone este repositório e entre na pasta do projeto:
   ```bash
   git clone <seu-repo>
   cd n8n
   ```

2. Entre na pasta do custom node:
   ```bash
   cd custom/nodes
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Compile o código TypeScript:
   ```bash
   npm run build
   ```

---

## Subindo a infra com Docker

1. Suba os containers do n8n + Postgres:
   ```bash
   docker compose up -d
   ```

2. Verifique se estão rodando:
   ```bash
   docker ps
   ```

   Você deve ver algo como:
   ```
   CONTAINER ID   IMAGE         COMMAND                  PORTS                  NAMES
   abc123...      n8nio/n8n     "tini -- /docker-ent…"   0.0.0.0:5678->5678/tcp   n8n
   def456...      postgres:15   "docker-entrypoint.s…"   5432/tcp                 n8n-postgres
   ```

3. Acesse o n8n no navegador:  
   **Link:** [http://localhost:5678](http://localhost:5678)

5. Pronto! O conector será disponibilizado no n8n, em **Nodes → Random**.

---

## Estrutura do projeto

```
n8n/
├── custom/
│   └── nodes/
│       └── Random/
│           ├── Random.node.ts
│           ├── Random.node.json
│           ├── random.svg
│           └── package.json
├── compose.yaml           # Configuração Docker Compose
├── .gitignore
├── tsconfig.json
├── README.md  

```

---

## Como usar no n8n

1. No **Editor UI do n8n**, adicione um novo **Node**.  
2. Procure por **Random**.  
3. Configure os campos:
   - **Min** → valor mínimo (ex: 1)
   - **Max** → valor máximo (ex: 60)
4. Execute o workflow → você receberá um número aleatório real da API Random.org.

---
