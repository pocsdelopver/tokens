const express = require('express')
const config = require('./commons/config')
const authRoutes = require('./routes/auth.routes')

const app = express()
app.use(express.json())

// Routes
app.use('/', authRoutes)

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Prestamos');
}
)

app.listen(config.port, () => {
    console.log(`Servidor autenticación escuchando en puerto ${config.port}`)
})