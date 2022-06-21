const { Client } = require('pg');


const client = new Client({
    host : process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

client.connect();


class Db{
    async Query(Sql , values )  {
        const { rows } = await client.query(Sql, values);
        return rows;
    }
};

module.exports = Db;
 