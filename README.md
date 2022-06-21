Maximatech Digital Wallet
===

Welcome to the monorepo of maxima-tech-digital-wallet app.

This repository is a challenge for a position job at Maximatech and aims to show in practice all my hard and soft skills as a developer.

## Run Details summary:

```
cd backend
npm i
node .\src\app\index.js
cd ..
cd frontend
npm start
cd ..
docker-compose up -d
```


## Database

We use PostgreSQL for database queries, to install:

- [MacOS](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3)
- [Windows](https://www.postgresql.org/download/windows/)
- [Linux](https://www.postgresql.org/download/linux/)

After install PostgreSQL create a database;

```shell
➜  user git:(master) ✗ psql
psql (12.2)
Type "help" for help.

brabo=# CREATE DATABASE postgres;
```

---

### Server Side
#### Schema creation / migration / db updates

To create the first schema or update your db with new schema updates, we need to create it manualy. Just execute de SQL scrip in backend/src/database/schema.sql.


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
### Error handling
Aways when a request fails by any reason the API will response the respecting http error code and the following response body:
```
"Error" :{
    "message" = "the error message comes here"
}
```