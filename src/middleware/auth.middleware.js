const jwt = require('jsonwebtoken')
const config = require('../commons/config')

function authenticateToken(req, res, next) {
    const { authorization } = req.headers
    console.log(`Token: ${authorization}`)
    
    if (!authorization) return res.status(401).json()

    jwt.verify(authorization, config.secretKey, (err, user) => {
        if (err) return res.status(403).json()
        req.user = user
        next()
    })
}

module.exports = {
    authenticateToken
} 