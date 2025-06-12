const AuthService = require('../services/auth.service')

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body
        const result = AuthService.login(username, password)
        
        if (result) {
            return res.json(result)
        }
        res.status(401).json({ error: 'Credenciales inválidas' })
    }

    static async getProtectedData(req, res) {
        const data = AuthService.getProtectedData(req.user)
        res.json(data)
    }
}

module.exports = AuthController 