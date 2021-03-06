const Db = require('../../database');

class MovimentacaoRepository{
    db = new Db();

    async create(login_origem, login_destino, valor_transferido){
        let data = new Date();
        const Sql = `INSERT INTO movimentacao ("data" , login_origem, login_destino, valor_transferido ) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [ data, login_origem, login_destino, valor_transferido ];
        console.log("foi bem aqui")
        const rows = await this.db.Query(Sql, values);
        return rows[0];
    }

    async findAllByLogin(login){
        const Sql = `SELECT * FROM movimentacao WHERE login_origem = $1 OR login_destino = $2`;
        const rows = await this.db.Query ( Sql , [login, login]);
        console.log(rows);
        return rows;
    }
    
    async findById(id) {
        if (id) {
            const Sql = 'SELECT * FROM movimentacao WHERE id_transacao = $1';
            return (await this.db.Query(Sql, [id]))[0];
        }
        return null
    }
}

module.exports = new MovimentacaoRepository();