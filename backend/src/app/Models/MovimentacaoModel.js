const MovimentacaoRepository = require("../Repo/MovimentacaoRepository");

/**
 * The MovimentacaoModel class is responsible for representing the MOVIMENTACAO entity and holds its business logic
 */
class MovimentacaoModel {
    constructor( login_origem, login_destino, valor_transferido, id_transacao = null){
        this.id_transacao = id_transacao || '';
        this.data = '';
        this.login_origem = login_origem || '';
        this.login_destino = login_destino || '';
        this.valor_transferido = valor_transferido || '';
        this.isItNew = true
        this.Promise = this.build()
    }

    /**
     * build function tries to find the transaction that was passed by the login attribute in the database, if it is found then it builds the object with it, if not the object remains the same
     */
    async build(){
        try {
            const result = await MovimentacaoRepository.findById(this.id_transacao);
            console.log(result)
            if (result) {
                this.data = result.data
                this.login_origem = result.login_origem
                this.login_destino = result.login_destino
                this.valor_transferido = result.valor_transferido
                this.isItNew = false
            }
        } catch (e) {
            throw e
        }
    }

    /**
     * Save the MOVIMENTACAO data in the database, if the transaction does not exist in the database, a new one is created
     */
    async store(){
        await Promise.resolve(this.Promise)
        if (this.isItNew) {
            if (this.login_origem == this.login_destino) {
                throw `Não é possivel fazer transferencias para si mesmo.`
            }
            try {
                await MovimentacaoRepository.create(this.login_origem, this.login_destino, this.valor_transferido)
            } catch (e) {
                throw e
            }
        } else {
            // UPDATE MOVIMENTACAO
        }
    }
};


module.exports = MovimentacaoModel;