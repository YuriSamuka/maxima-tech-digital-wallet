const { Router } = require('express')
const routes = Router({mergeParams: true})

/**
 * UsuarioController and MovimentacaoController
 */
const UsuarioController = require("./Controllers/UsuarioController")
const MovimentacaoController = require("./Controllers/MovimentacaoController")

/**
 * The AuthHandler middleware is
 *  responsable to protect all the private routes with JWT authentication
 */
const AuthHandler = require("./middleware/AuthHandler")


/**
 * Usuario routes
 * The /usuario endpoint returns all data about the signed-in user.
 * The /register endpoint is responsible for registering a new user in the application
 * The /login endpoint is responsible to generate JWT tokens to authenticate and give access to private endpoints
 * To see the payload and authentication methods in more detail, access README.md
 */
routes.get("/usuario", AuthHandler.verifyAccessToken, UsuarioController.show)
routes.post("/register", UsuarioController.store)
routes.post("/login", UsuarioController.login)

/**
 * Movimentacao routes
 * The /movimentacao/transfer is responsible for making a transaction from one user to another
 * The /movimentacao endpoint returns all transactions made by the logged user
 * To see the payload and authentication methods in more detail, access README.md
 */
routes.post("/movimentacao/transfer", AuthHandler.verifyAccessToken, MovimentacaoController.transfer);
routes.get("/movimentacao", AuthHandler.verifyAccessToken, MovimentacaoController.list)

module.exports = routes;