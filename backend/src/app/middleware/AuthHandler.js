const jwt = require("jsonwebtoken")

class AuthHandler {
    async verifyAccessToken(req, res, next){
        const authHeader = req.headers['authorization']
        if (!authHeader) {
            return res.sendStatus(401)
        }
        console.log(authHeader)
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.sendStatus(403)
                }
                req.loggedUsuario = decoded.login
                next()
            }
        )
    }

}

module.exports = new AuthHandler()