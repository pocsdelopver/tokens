const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./commons/swagger')
const config = require('./commons/config')
const authRoutes = require('./routes/auth.routes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// Routes
app.use('/', authRoutes)

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Tokens');
})

app.listen(config.port, () => {
    console.log(`Servidor autenticación escuchando en puerto ${config.port}`)
    console.log(`Documentación Swagger disponible en: http://localhost:${config.port}/api-docs`)
})

module.exports = app