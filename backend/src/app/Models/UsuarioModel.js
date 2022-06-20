const UsuarioRepository = require("../Repo/UsuarioRepository");
const MovimentacaoModel = require("../Models/MovimentacaoModel");
const MovimentacaoRepository = require("../Repo/MovimentacaoRepository");

class UsuarioModel {
    constructor( login, senha, nome, saldo ){
        this.login = login
        this.senha = senha || ''
        this.nome = nome || ''
        this.saldo = saldo || ''
        this.isItNew = true
        this.Promise = this.build()
    }

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