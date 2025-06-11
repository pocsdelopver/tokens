const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Genera una llave secreta usando SHA-256
const secretKey = crypto.createHash('sha256').update('mi_clave_super_secreta').digest('hex');

// Ruta de login para generar el token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí deberías validar el usuario y contraseña
  if (username === 'admin' && password === '1234') {
    const payload = { username };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Credenciales inválidas' });
});

// Middleware para verificar el token()
function authenticateToken(req, res, next) {
  const {authorization} = req.headers
  console.log(`Token: ${authorization}`)
  if (!authorization) return res.sendStatus(401);

  jwt.verify(authorization, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Ruta protegida
app.get('/protegido', authenticateToken, (req, res) => {
  res.json({ mensaje: 'Acceso concedido', usuario: req.user });
});

app.listen(3000, () => {
  console.log('Servidor autenticación escuchando en puerto 3000');
});