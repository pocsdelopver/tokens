const jwt = require('jsonwebtoken')
const config = require('../commons/config')

class AuthService {
    static login(username, password) {
        // Aquí deberías validar el usuario y contraseña
        if (username === 'admin' && password === '1234') {
            const payload = { username }
            const token = jwt.sign(payload, config.secretKey, { expiresIn: '1h' })
            return { token }
        }
        return null
    }

    static getProtectedData(user) {
        return {
            mensaje: 'Acceso concedido',
            usuario: user
        }
    }
}

module.exports = AuthService 