const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../src/middleware/auth.middleware');
const config = require('../src/commons/config');

const expect = chai.expect;

describe('Auth Middleware', () => {
    let req, res, next, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            headers: {}
        };
        res = {
            status: sandbox.stub().returnsThis(),
            json: sandbox.spy()
        };
        next = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return 401 when no token is provided', () => {
        authenticateToken(req, res, next);
        expect(res.status.calledWith(401)).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 403 when token is invalid', () => {
        req.headers.authorization = 'invalid-token';
        authenticateToken(req, res, next);
        expect(res.status.calledWith(403)).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should call next() when token is valid', () => {
        const user = { username: 'admin' };
        const token = jwt.sign(user, config.secretKey);
        req.headers.authorization = token;

        authenticateToken(req, res, next);
        expect(next.called).to.be.true;
        expect(req.user).to.deep.include(user);
    });
}); 