const express = require('express')
const config = require('./commons/config')
const authRoutes = require('./routes/auth.routes')

const app = express()
app.use(express.json())

// Routes
app.use('/', authRoutes)

app.listen(config.port, () => {
    console.log(`Servidor autenticación escuchando en puerto ${config.port}`)
})