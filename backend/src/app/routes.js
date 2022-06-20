const { Router } = require('express')
const routes = Router({mergeParams: true})

const UsuarioController = require("./Controllers/UsuarioController")
const MovimentacaoController = require("./Controllers/MovimentacaoController")
const AuthHandler = require("./middleware/AuthHandler")

/** Usuario routes */
routes.get("/usuario", AuthHandler.verifyAccessToken, UsuarioController.show)
routes.post("/register", UsuarioController.store)
routes.post("/login", UsuarioController.login)

 /** Movimentacao routes */
routes.post("/movimentacao/transfer", AuthHandler.verifyAccessToken, MovimentacaoController.transfer);
routes.get("/movimentacao", AuthHandler.verifyAccessToken, MovimentacaoController.list)

module.exports = routes;