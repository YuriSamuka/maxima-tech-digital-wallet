
const { Client } = require('pg');

const client = new Client({
    host : 'localhost',
    port: 15432,
    user: 'postgres',
    password: '123',
    database: 'postgres',
});

client.connect();


class Db{
    async Query(Sql , values )  {
        const { rows } = await client.query(Sql, values);
        return rows;
    }
};

module.exports = Db;
 