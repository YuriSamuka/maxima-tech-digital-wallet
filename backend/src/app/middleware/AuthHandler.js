const jwt = require("jsonwebtoken")

class AuthHandler {
    /**
     * 
     * @param {*} req Express http request
     * @param {*} res Express http response
     * @param {*} next The next function the keep going after verification
     * @returns undefined
     */
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