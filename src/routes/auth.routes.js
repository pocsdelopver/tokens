const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const { authenticateToken } = require('../middleware/auth.middleware')

router.post('/login', AuthController.login)
router.get('/validaToken', authenticateToken, AuthController.getProtectedData)

module.exports = router 