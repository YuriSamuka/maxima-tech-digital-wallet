const UsuarioModel = require("../Models/UsuarioModel")
const jwt = require("jsonwebtoken")

class UserController {
    async store(req, res){
        const { login, senha, nome } = req.body;
        try {
            const newUsuario = new UsuarioModel(login, senha, nome)
            await newUsuario.build()
            if (newUsuario.isItNew) {
                newUsuario.store()
                return res.status(200).json(newUsuario)
            } else {
                return res.status(412).json ({Error: "Usuário já existe."})
            }
        } catch (e) {
            return res.status(404).json ({Error: e?.message})
        }
    }

    async login(req, res){
        const { login, senha } = req.body
        if (!login || !senha) {
            return res.status(400).json({ 'message' : 'Login e senha são obrigatórios'})
        }
        const foundUsuario = new UsuarioModel(login)
        await foundUsuario.build()
        if (foundUsuario.isItNew) {
            return res.sendStatus(401)
        }
        if (foundUsuario.senha == senha) {
            const accessToken = jwt.sign(
                {"login" : foundUsuario.login},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '5m' }
            )
            const refreshToken = jwt.sign(
                {"login" : foundUsuario.login},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn : '1d' }
            )
            res.json({ accessToken, refreshToken })
        } else {
            res.sendStatus(401)
        }    
    }

    async show(req, res ) {
        console.log(req.loggedUsuario)
        const usuario = new UsuarioModel(req.loggedUsuario)
        await usuario.build()
        if ( usuario.isItNew ){
            return res.status (404).json ( {Error: "Usuario não encontrado" } );
        }
        return res.status (200).json ({ usuario } );
    }
}

module.exports = new UserController(); 