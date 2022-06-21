const Db = require('../../database')

class UsuarioRepository{
    db = new Db()

    async create(login, senha, nome){
        const Sql = `INSERT INTO usuario ("login" , senha, nome ) VALUES ($1, $2, $3) RETURNING *`
        const values = [ login, senha, nome ]
        const rows = await this.db.Query(Sql, values)
        const usuario = rows[0]
        const saldo = await this.createSaldoUsuario(login, 100)
        return {...usuario, saldo: saldo.saldo}
    }

    async createSaldoUsuario(login, inital_value){
        const Sql = `INSERT INTO saldo ("login" , saldo ) VALUES ($1, $2) RETURNING *`
        const values = [ login, inital_value ]
        const rows = await this.db.Query(Sql, values)
        return rows[0]
    }
    
    async findByLogin(login){
        const Sql = `SELECT * FROM usuario WHERE login = $1`
        const rows = await this.db.Query ( Sql , [login] )
        const usuario = rows[0]
        if (!usuario) {
            return false;
        } else {
            const saldo = await this.showSaldoByLogin(login)
            return {...usuario, saldo: saldo.saldo}
        }
    }

    async showSaldoByLogin(login){
        const Sql = `SELECT * FROM saldo WHERE login = $1`
        const rows = await this.db.Query ( Sql , [login])
        console.log(rows)
        return rows[0]
    }

    async updateSaldo(login, newSaldo){
        const Sql = `UPDATE saldo SET saldo = ${newSaldo} WHERE login = $1`;
        const rows = await this.db.Query ( Sql , [login]);
        console.log(rows);
        return rows[0]
    }
}

module.exports = new UsuarioRepository()