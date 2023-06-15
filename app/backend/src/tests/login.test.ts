import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/SequelizeUser';
import userMock from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login integration tests', function() {
  beforeEach(sinon.restore)

  describe('POST /login', function() {
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

    it ('sould return unauthorized if email doesn\'t exists', async function () {
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

    it ('sould return unauthorized if password is wrong', async function () {
      sinon.stub(SequelizeUser, 'findOne')
        .resolves(userMock.userWithExtraProps as any);
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
});
