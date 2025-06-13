const chai = require('chai')
const chaiHttp = require('chai-http')
const jwt = require('jsonwebtoken')
const config = require('../src/commons/config')
const express = require('express')
const authRoutes = require('../src/routes/auth.routes')

chai.use(chaiHttp)
const expect = chai.expect

describe('Auth Routes', () => {
    let token
    let app
    let server

    before(() => {
        // Crear una nueva instancia de la aplicación para las pruebas
        app = express()
        app.use(express.json())
        app.use('/api/v1', authRoutes)
        
        // Crear un token válido para las pruebas
        const user = { username: 'admin' }
        token = jwt.sign(user, config.secretKey)
    })

    after(() => {
        if (server) {
            server.close()
        }
    })

    describe('POST /login', () => {
        it('should return token for valid credentials', (done) => {
            chai.request(app)
                .post('/api/v1/login')
                .send({ username: 'admin', password: '1234' })
                .end((err, res) => {
                    if (err) {
                        done(err)
                        return
                    }
                    try {
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('token')
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })

        it('should return 401 for invalid credentials', (done) => {
            chai.request(app)
                .post('/api/v1/login')
                .send({ username: 'admin', password: 'wrong' })
                .end((err, res) => {
                    if (err) {
                        done(err)
                        return
                    }
                    try {
                        expect(res).to.have.status(401)
                        expect(res.body).to.have.property('error', 'Credenciales inválidas')
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })
    })

    describe('GET /validaToken', () => {
        it('should return 401 when no token is provided', (done) => {
            chai.request(app)
                .get('/api/v1/validaToken')
                .end((err, res) => {
                    if (err) {
                        done(err)
                        return
                    }
                    try {
                        expect(res).to.have.status(401)
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })

        it('should return 403 when token is invalid', (done) => {
            chai.request(app)
                .get('/api/v1/validaToken')
                .set('Authorization', 'invalid-token')
                .end((err, res) => {
                    if (err) {
                        done(err)
                        return
                    }
                    try {
                        expect(res).to.have.status(403)
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })

        it('should return protected data when token is valid', (done) => {
            chai.request(app)
                .get('/api/v1/validaToken')
                .set('Authorization', `${token}`)
                .end((err, res) => {
                    if (err) {
                        done(err)
                        return
                    }
                    try {
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('mensaje', 'Acceso concedido')
                        expect(res.body).to.have.property('usuario')
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        })
    })
}) 