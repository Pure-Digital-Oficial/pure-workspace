# Documentação das Variáveis de Ambiente

Este documento descreve as variáveis de ambiente utilizadas no projeto, seu propósito, como preenchê-las e exemplos de valores. As variáveis de ambiente são essenciais para a configuração do ambiente de execução da aplicação.

---

## Variáveis de Ambiente

### Aplicação Web

- **`WEB_PURE_DIGITAL_PORT`**
  - **Propósito**: Define a porta onde a aplicação web será executada.
  - **Como preencher**: Insira um número de porta disponível no sistema.
  - **Exemplo**:
    ```
    WEB_PURE_DIGITAL_PORT=4201
    ```

### Servidor Geral

- **`SERVER_PURE_GENERAL_PORT`**
  - **Propósito**: Define a porta onde o servidor geral será executado.
  - **Como preencher**: Insira um número de porta disponível no sistema.
  - **Exemplo**:
    ```
    SERVER_PURE_GENERAL_PORT=4000
    ```

### Banco de Dados PostgreSQL

- **`POSTGRES_GENERAL_USER`**

  - **Propósito**: Usuário do banco de dados PostgreSQL.
  - **Como preencher**: Insira o nome de usuário configurado no banco de dados.
  - **Exemplo**:
    ```
    POSTGRES_GENERAL_USER=root
    ```

- **`POSTGRES_GENERAL_PASSWORD`**

  - **Propósito**: Senha do banco de dados PostgreSQL.
  - **Como preencher**: Insira a senha configurada para o usuário do banco de dados.
  - **Exemplo**:
    ```
    POSTGRES_GENERAL_PASSWORD=root
    ```

- **`POSTGRES_GENERAL_DB`**

  - **Propósito**: Nome do banco de dados PostgreSQL.
  - **Como preencher**: Insira o nome do banco de dados que será utilizado.
  - **Exemplo**:
    ```
    POSTGRES_GENERAL_DB=workspace
    ```

- **`POSTGRES_GENERAL_HOST`**

  - **Propósito**: Host do banco de dados PostgreSQL.
  - **Como preencher**: Insira o endereço do servidor onde o banco de dados está hospedado.
  - **Exemplo**:
    ```
    POSTGRES_GENERAL_HOST=localhost
    ```

- **`POSTGRES_GENERAL_PORT`**
  - **Propósito**: Porta do banco de dados PostgreSQL.
  - **Como preencher**: Insira a porta configurada para o banco de dados.
  - **Exemplo**:
    ```
    POSTGRES_GENERAL_PORT=5435
    ```

### JWT (JSON Web Token)

- **`JWT_REFRESH_SECRET`**

  - **Propósito**: Chave secreta para geração de tokens de atualização (refresh tokens).
  - **Como preencher**: Insira uma string aleatória e segura.
  - **Exemplo**:
    ```
    JWT_REFRESH_SECRET="chaveQualquer"
    ```

- **`JWT_REFRESH_EXPIRATION_IN`**

  - **Propósito**: Define o tempo de expiração dos tokens de atualização.
  - **Como preencher**: Insira o tempo de expiração no formato aceito (ex.: `7d` para 7 dias, `10m` para 10 minutos, `60s` para 60 segundos).
  - **Exemplo**:
    ```
    JWT_REFRESH_EXPIRATION_IN=7d
    ```

- **`JWT_ACCESS_SECRET`**

  - **Propósito**: Chave secreta para geração de tokens de acesso (access tokens).
  - **Como preencher**: Insira uma string aleatória e segura.
  - **Exemplo**:
    ```
    JWT_ACCESS_SECRET="chaveQualquer"
    ```

- **`JWT_ACCESS_EXPIRATION_IN`**
  - **Propósito**: Define o tempo de expiração dos tokens de acesso.
  - **Como preencher**: Insira o tempo de expiração no formato aceito (ex.: `7d` para 7 dias, `10m` para 10 minutos, `60s` para 60 segundos).
  - **Exemplo**:
    ```
    JWT_ACCESS_EXPIRATION_IN=60s
    ```

### Configurações do Frontend

- **`NEXT_PUBLIC_PURE_DIGITAL_APP_ID`**

  - **Propósito**: ID da aplicação no frontend, inserida no banco de dados.
  - **Como preencher**: Insira o ID da aplicação, que foi criada na tabela application.
  - **Exemplo**:
    ```
    NEXT_PUBLIC_PURE_DIGITAL_APP_ID=1
    ```

- **`NEXT_PUBLIC_ACCESS_TOKEN_KEY`**

  - **Propósito**: Chave para armazenar o token de acesso no frontend, será o nome da variavel nos tokens.
  - **Como preencher**: Insira uma string identificadora para o token de acesso.
  - **Exemplo**:
    ```
    NEXT_PUBLIC_ACCESS_TOKEN_KEY="nome_do_token_de_acesso"
    ```

- **`NEXT_PUBLIC_REFRESH_TOKEN_KEY`**

  - **Propósito**: Chave para armazenar o token de atualização no frontend, será o nome da variavel nos tokens.
  - **Como preencher**: Insira uma string identificadora para o token de atualização.
  - **Exemplo**:
    ```
    NEXT_PUBLIC_REFRESH_TOKEN_KEY="nome_do_token_de_atualizacao"
    ```

- **`NEXT_PUBLIC_SERVER_PURE_GENERAL_URL`**
  - **Propósito**: URL do servidor geral para o frontend.
  - **Como preencher**: Insira a URL completa do servidor geral.
  - **Exemplo**:
    ```
    NEXT_PUBLIC_SERVER_PURE_GENERAL_URL="http://localhost:${SERVER_PURE_GENERAL_PORT}/pure-general-api"
    ```

### Redis

- **`REDIS_PORT`**

  - **Propósito**: Porta do servidor Redis.
  - **Como preencher**: Insira a porta configurada para o Redis.
  - **Exemplo**:
    ```
    REDIS_PORT=6379
    ```

- **`REDIS_PASSWORD`**

  - **Propósito**: Senha do servidor Redis (se aplicável).
  - **Como preencher**: Insira a senha configurada para o Redis ou deixe vazio se não houver senha.
  - **Exemplo**:
    ```
    REDIS_PASSWORD="password"
    ```

- **`REDIS_URL`**

  - **Propósito**: URL completa do servidor Redis.
  - **Como preencher**: Insira a URL completa do Redis ou deixe vazio se não for necessário.
  - **Exemplo**:
    ```
    REDIS_URL=
    ```

- **`REDIS_EXPIRATION`**
  - **Propósito**: Tempo de expiração padrão para chaves no Redis (em segundos).
  - **Como preencher**: Insira o tempo de expiração em segundos.
  - **Exemplo**:
    ```
    REDIS_EXPIRATION=604800
    ```

### URL do Banco de Dados

- **`DATABASE_GENERAL_URL`**
  - **Propósito**: URL de conexão completa para o banco de dados PostgreSQL.
  - **Como preencher**: Insira a URL completa no formato aceito pelo PostgreSQL.
  - **Exemplo**:
    ```
    DATABASE_GENERAL_URL="postgresql://${POSTGRES_GENERAL_USER}:${POSTGRES_GENERAL_PASSWORD}@${POSTGRES_GENERAL_HOST}:${POSTGRES_GENERAL_PORT}/${POSTGRES_GENERAL_DB}"
    ```

---

## Como Usar

1. Crie um arquivo `.env` na raiz do projeto.
2. Copie as variáveis de ambiente necessárias do arquivo `.env.example` para o seu arquivo `.env`.
3. Preencha cada variável com os valores apropriados conforme descrito acima.
