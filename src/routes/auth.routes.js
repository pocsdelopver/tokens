const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const { authenticateToken } = require('../middleware/auth.middleware')

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', AuthController.login)

/**
 * @swagger
 * /validaToken:
 *   get:
 *     summary: Validar token JWT y obtener datos protegidos
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT en formato 'Bearer {token}'
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     responses:
 *       200:
 *         description: Token válido y datos obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   type: object
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido
 *     x-codeSamples:
 *       - lang: curl
 *         source: |
 *           curl -X GET "http://localhost:8080/validaToken" \
 *           -H "accept: application/json" \
 *           -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 */
router.get('/validaToken', authenticateToken, AuthController.getProtectedData)

module.exports = router 