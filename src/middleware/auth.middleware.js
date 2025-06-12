const jwt = require('jsonwebtoken');
const config = require('../commons/config');

function authenticateToken(req, res, next) {
    const { authorization } = req.headers;
    console.log(`Token: ${authorization}`);
    
    if (!authorization) return res.sendStatus(401);

    jwt.verify(authorization, config.secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
}; 