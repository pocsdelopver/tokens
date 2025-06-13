const chai = require('chai');
const sinon = require('sinon');
const AuthService = require('../src/services/auth.service');

const expect = chai.expect;

describe('AuthService', () => {
    describe('login', () => {
        it('should return token for valid credentials', () => {
            const result = AuthService.login('admin', '1234');
            expect(result).to.have.property('token');
            expect(result.token).to.be.a('string');
        });

        it('should return null for invalid credentials', () => {
            const result = AuthService.login('admin', 'wrongpassword');
            expect(result).to.be.null;
        });
    });

    describe('getProtectedData', () => {
        it('should return protected data with user info', () => {
            const user = { username: 'admin' };
            const result = AuthService.getProtectedData(user);
            expect(result).to.have.property('mensaje', 'Acceso concedido');
            expect(result).to.have.property('usuario');
            expect(result.usuario).to.deep.equal(user);
        });
    });
}); 