Maximatech Digital Wallet
===

Welcome to the monorepo of maxima-tech-digital-wallet app.

This repository has the propose of perform a 

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

We have a few apps in our server side, the `package.json` along with all code is shared between all apps in server.


#### Schema creation / migration / db updates

To create the first schema or update your db with new schema updates, we need to create it manualy. Just execute de SQL scrip in backend/src/database/schema.sql.