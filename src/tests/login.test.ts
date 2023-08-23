import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser';
import userMock from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login integration tests', function() {
  beforeEach(sinon.restore)

  describe('POST /login', function() {
    it('should return a token if email and password are valid', async function () {
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock.sequelizeUser as any);
      sinon.stub(jwt, 'sign').returns('token' as any);
      sinon.stub(bcrypt, 'compareSync').returns(true);

      const { status, body } = await chai
        .request(app)
        .post('/login/')
        .send({
          email: userMock.validEmail,
          password: userMock.validPassword,
        });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ token: 'token' });
    });

    it('should return bad request if email was not sent', async function() {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({
          password: userMock.validPassword,
        });
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('should return bad request if password was not sent', async function() {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({
          email: userMock.validEmail,
        });
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('should return unauthorized if email is invalid', async function() {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({
          email: userMock.invalidEmail,
          password: userMock.validPassword,
        });
      
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('should return unauthorized if password is invalid', async function() {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({
          email: userMock.validEmail,
          password: userMock.invalidPassword,
        });
      
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it ('sould return unauthorized if email doesn\'t exists', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(undefined);

      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({
          email: userMock.validEmail,
          password: userMock.validPassword,
        });
      
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it ('sould return unauthorized if password is wrong', async function() {
      sinon.stub(SequelizeUser, 'findOne')
        .resolves(userMock.sequelizeUser as any);
      sinon.stub(bcrypt, 'compareSync').returns(false);

      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({
          email: userMock.validEmail,
          password: 'wrong password here',
        });
      
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  });

  describe('GET /login/role', function() {
    it('should return unauthorized if a token was not sent in headers', async function() {
      const { status, body } = await chai
        .request(app)
        .get('/login/role')
      
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('should return unauthorized if the token is invalid', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock.sequelizeUser as any);
      sinon.stub(jwt, 'verify').throws();

      const { status, body } = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should return the user role if the token is valid', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock.sequelizeUser as any);
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ role: userMock.user.role });
    });
  });
});
