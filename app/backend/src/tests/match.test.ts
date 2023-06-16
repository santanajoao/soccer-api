import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import matchMock from './mocks/match.mock';
import userMock from './mocks/user.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match integration tests', function() {
  beforeEach(sinon.restore);

  describe('GET /matches', function() {
    it('should return all matches', async function() {
      sinon.stub(SequelizeMatch, 'findAll')
        .resolves(matchMock.sequelizeMatchList as any);  
    
      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matchMock.matchList);
    });

    it('should return in progress matches if route querie is true', async function() {
      sinon.stub(SequelizeMatch, 'findAll')
        .resolves(matchMock.sequelizeMatchList as any);  

      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'true' });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matchMock.matchList);
    })

    it('should return finished matches if route querie is false', async function() {
      sinon.stub(SequelizeMatch, 'findAll')
        .resolves(matchMock.sequelizeMatchList as any);  

      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'false' });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matchMock.matchList);
    });

    it('should return unprocessable if inProgress is a invalid value', async function() {
      const { status, body } = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: 'dont know' });

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: 'inProgress should be true or false' });
    });
  });

  describe('PATCH matches/:id/finish', function() {
    it('should return ok and finish message', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      sinon.stub(SequelizeMatch, 'findByPk').resolves(matchMock.sequelizeMatch as any);
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'Finished' });
    });

    it('should return with unauthorized if no token was sent', async function() {
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('should return unauthorized if token is invalid', async function() {
      sinon.stub(jwt, 'verify').throws();

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should return not found when the match doesnt exist', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1293840/finish')
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Match not found' });
    });
  });

  describe('PATCH /matches/:id', function() {
    it('should return the updated match', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);
      sinon.stub(SequelizeMatch, 'update').resolves([1]);
      sinon.stub(SequelizeMatch, 'findByPk')
        .resolves(matchMock.sequelizeMatch as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/123123')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matchMock.match);
    });

    it('should return bad request if homeTeamGoals was not sent', async function() {
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          awayTeamGoals: 1,
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'homeTeamGoals is required' });
    });

    it('should return bad request if awayTeamGoals was not sent', async function() {
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          homeTeamGoals: 1,
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'awayTeamGoals is required' });
    });

    it('should return with unauthorized if no token was sent', async function() {
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('should return unauthorized if token is invalid', async function() {
      sinon.stub(jwt, 'verify').throws();

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should return not found when the match doesnt exist', async function() {
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/123123')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Match not found' });
    });
  });
});
