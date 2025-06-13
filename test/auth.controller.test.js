const chai = require('chai');
const sinon = require('sinon');
const AuthController = require('../src/controllers/auth.controller');
const AuthService = require('../src/services/auth.service');

const expect = chai.expect;

describe('AuthController', () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            body: {},
            user: {}
        };
        res = {
            json: sandbox.spy(),
            status: sandbox.stub().returnsThis()
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('login', () => {
        it('should return token for valid credentials', async () => {
            const token = { token: 'fake-token' };
            sandbox.stub(AuthService, 'login').returns(token);
            
            req.body = { username: 'admin', password: '1234' };
            await AuthController.login(req, res);

            expect(res.json.calledWith(token)).to.be.true;
        });

        it('should return 401 for invalid credentials', async () => {
            sandbox.stub(AuthService, 'login').returns(null);
            
            req.body = { username: 'admin', password: 'wrong' };
            await AuthController.login(req, res);

            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({ error: 'Credenciales inválidas' })).to.be.true;
        });
    });

    describe('getProtectedData', () => {
        it('should return protected data', async () => {
            const user = { username: 'admin' };
            const protectedData = { mensaje: 'Acceso concedido', usuario: user };
            
            sandbox.stub(AuthService, 'getProtectedData').returns(protectedData);
            req.user = user;
            
            await AuthController.getProtectedData(req, res);

            expect(res.json.calledWith(protectedData)).to.be.true;
        });
    });
}); 