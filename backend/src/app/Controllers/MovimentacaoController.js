const UsuarioModel = require("../Models/UsuarioModel");

/**
 * MovimentacaoController is responsible for intermediating the business logic and visualization
 */
class MovimentacaoController {
    /**
     * Transfer funds from logged in user to another
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async transfer(req, res){
        const { login_destino, valor_transferido } = req.body
        console.log(`usuario logado: ${req.loggedUsuario}`)
        try {
            const loggedUsuario = new UsuarioModel(req.loggedUsuario)
            const targetUsuario = new UsuarioModel(login_destino)
            await loggedUsuario.transfer(targetUsuario, valor_transferido)
        } catch (e) {
            return res.status (404).json ( { Error: e } )   
        }
        return res.sendStatus(200)
    }

    /**
     * Send back all transactions made by the user who is logged in
     * @param {*} req 
     * @param {*} res 
     */
    async list(req, res){
        const loggedUsuario = new UsuarioModel(req.loggedUsuario)
        const movimentacoes = await loggedUsuario.transactions()
        console.log("movimentações")
        console.log(movimentacoes)
        res.status(200).json(movimentacoes);
    }

}

module.exports = new MovimentacaoController()