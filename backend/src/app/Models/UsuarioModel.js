const UsuarioRepository = require("../Repo/UsuarioRepository");
const MovimentacaoModel = require("../Models/MovimentacaoModel");
const MovimentacaoRepository = require("../Repo/MovimentacaoRepository");

/**
 * The UsuarioModel class is responsible for representing the USUARIO entity and holds its business logic
 */
class UsuarioModel {
    constructor( login, senha, nome, saldo ){
        this.login = login
        this.senha = senha || ''
        this.nome = nome || ''
        this.saldo = saldo || ''
        this.isItNew = true
        this.Promise = this.build()
    }

    /**
     * build function tries to find the user that was passed by the login attribute in the database, if it is found then it builds the object with it, if not the object remains the same
     */
    async build(){
        try {
            const result = await UsuarioRepository.findByLogin(this.login);
            console.log(result)
            if (result) {
                this.senha = result.senha
                this.nome = result.nome
                this.saldo = result.saldo
                this.isItNew = false
            }
        } catch (e) {
            throw e
        }
    }

    /**
     * Save the USUARIO data in the database, if the user does not exist in the database, a new one is created
     */
    async store(){
        await Promise.resolve(this.Promise)
        if (this.isItNew) {
            try {
                await UsuarioRepository.create(this.login, this.senha, this.nome)
            } catch (e) {
                throw e
            }
        } else {
            // UPDATE USER
        }
    }

    /**
     * Receives a UsuarioModel object and a value to be transferred and performs the transaction
     * @param {*} usuarioDestino Usuario destiono
     * @param {*} value valor a ser transferido
     */
    async transfer(usuarioDestino, value){
        await Promise.resolve(this.Promise)
        try {
            if (this.saldo < value) {
                throw `Usuário ${this.login} não tem saldo suficiente.`
            }
            let tx = new MovimentacaoModel(this.login, usuarioDestino.login, value)
            await tx.store()
            await this.updateSaldo()
            await usuarioDestino.updateSaldo()
        } catch (e) {
            throw e
        }
    }

    /**
     * Update user saldo field in database
     */
    async updateSaldo(){
        await Promise.resolve(this.Promise)
        try {
            const startingBonus = 100
            const transactions = await this.transactions()
            const txValues = transactions.map((e) => (e.login_origem == this.login ? (e.valor_transferido * -1) : e.valor_transferido )) 
            const newSaldo = txValues.reduce((p, c) => ( p + c));
            await UsuarioRepository.updateSaldo(this.login, newSaldo + startingBonus)
            await this.build()
        } catch (e) {
            throw e
        }
    }

    /**
     * Get all transactions from the user that is built
     * @returns transactions[]
     */
    async transactions(){
        await Promise.resolve(this.Promise)
        try {
            const result = await MovimentacaoRepository.findAllByLogin(this.login)
            if (result) {
                return result
            }else{
                return []
            }
        } catch (e) {
            throw e
        }
    }
};


module.exports = UsuarioModel;