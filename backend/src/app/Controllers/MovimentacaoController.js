const UsuarioModel = require("../Models/UsuarioModel");

class MovimentacaoController {
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

    async list(req, res){
        const loggedUsuario = new UsuarioModel(req.loggedUsuario)
        const movimentacoes = await loggedUsuario.transactions()
        console.log("movimentações")
        console.log(movimentacoes)
        res.status(200).json(movimentacoes);
    }

}

module.exports = new MovimentacaoController()