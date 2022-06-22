Maximatech Digital Wallet
===

Welcome to the monorepo of maxima-tech-digital-wallet app.

This repository is a challenge for a position job at Maximatech and aims to show in practice all my hard and soft skills as a developer.

## Run Details summary:
### Configuration file:
The .env file at the root of the backend folder is the configuration file where the database environment variables are set. The secrets to generate the JWT in the authentication process are also configured in this file. The starting balance amount that every user gets when registering an account.

### Database
We use PostgreSQL for database queries, to install:

- [MacOS](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3)
- [Windows](https://www.postgresql.org/download/windows/)
- [Linux](https://www.postgresql.org/download/linux/)

## Backend run details:
First install docker and docker compose

- [MacOS](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3)
- [Windows](https://www.postgresql.org/download/windows/)
- [Linux](https://www.postgresql.org/download/linux/)

After installing docker and docker compose, create a backend image from the Dockerfile by doing the following:
```
cd backend
sudo docker build -t app .
```
After creating a backend image, run docker compose to get the created services running
```
cd backend
sudo docker-compose up -d
```

After installing PostgreSQL and docker and putting the services live, run the migrations to initialize the database and create the tables from schema.sql.
```
cd .\backend\src\database\
node .\runMigrations.js migration_001
```
---

## The API

The following are the payload request and the response details for the API and authentication method

### Authentication

To gain access to private endpoints, you must first log in.
Login is done by sending a post to the endpoint.
```
[BASE_URL]/login
```
The payload that must be sent is as follows:
```
{
    "login":"[LOGIN]",
    "senha":"[PASSWORD]"
}
```
The response will be:

```
{
    "accessToken":"[ACCESSTOKEN]",
    "refreshToken":"[REFRESHTOKEN]"
}
```
Once you get the accessToken you need to put it in the request headers in the authorization field:
```
headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth.accessToken}`
}
```
---
### User endpoints
```
[BASE_URL]/usuario
```
The /usuario endpoint returns all data about the signed-in user.
It's a private endpoint, so you need to authenticate the user first.
* Method : GET
* Payload: none
* Authenticated: true
* Response:
```
"usuario": {
    "login" = "login",
    "senha" = "senha || ''",
    "nome" = "nome || ''",
    "saldo" = "saldo || ''",
    "isItNew" = "true",
    "Promise" = ""
}
```
```
[BASE_URL]/register
```
The /register endpoint is responsible for registering a new user in the application
* Method : POST
* Payload: 
```
{
    "login" = "login",
    "senha" = "senha || ''",
    "nome" = "nome || ''",
    "saldo" = "saldo || ''",
}
```
* Authenticated: false
* Response: none

---

### Transaction endpoints
```
[BASE_URL]/movimentacao/transfer
```
The /movimentacao/transfer is responsible for making a transaction from one user to another
* Method : POST
* Payload: 
```
{
    "login_destino" = "login destiono",
    "valor_transferido" = "10"
}
```
* Authenticated: true
* Response: none

```
[BASE_URL]/movimentacao
```
The /movimentacao endpoint returns all transactions made by the logged in user
* Method : POST
* Payload: none
* Authenticated: true
* Response:
```
[
    {
        "id_transacao" = "",
        "data" = ""
        "login_origem" = ""
        "login_destino" = ""
        "valor_transferido" = ""
    }
]
```
---
### Error handling
Aways when a request fails by any reason the API will response the respecting http error code and the following response body:
```
"Error" :{
    "message" = "the error message comes here"
}
```