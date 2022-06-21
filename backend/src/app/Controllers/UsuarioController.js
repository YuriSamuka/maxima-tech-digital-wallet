const UsuarioModel = require("../Models/UsuarioModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

/**
 * UserController is responsible for intermediating the business logic and visualization
 */
class UserController {
    /**
     * This function tries to create a new user, if the user already exists the function sends back an http error 412
     * @param {*} req Express http request
     * @param {*} res Express http response
     * @returns undefined
     */
    async store(req, res){
        const { login, senha, nome } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(senha, 10);
            const newUsuario = new UsuarioModel(login, hashedPassword, nome)
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

    /**
     * The login method is responsible for generating the JWT tokens to access private endpoints.
     * @param {*} req Express http request
     * @param {*} res Express http response
     * @returns undefined 
     */
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
        const bothMatch = await bcrypt.compare(senha, foundUsuario.senha);
        if (bothMatch) {
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

    /**
     * The show method send back all the data of the user is logged in
     * @param {*} req Express http request
     * @param {*} res Express http response
     * @returns undefined
     */
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