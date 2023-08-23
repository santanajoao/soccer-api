import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import matchMock from './mocks/match.mock';
import userMock from './mocks/user.mock';
import teamMock from './mocks/team.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

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
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matchMock.match);
    });

    it('should return bad request if homeTeamGoals was not sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          awayTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'homeTeamGoals is required' });
    });

    it('should return bad request if awayTeamGoals was not sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({
          homeTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

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

  describe('POST /matches', function () {
    it('should return the created match', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);
      sinon.stub(SequelizeTeam, 'findAll').resolves(teamMock.sequelizeTeamList as any);
      sinon.stub(SequelizeMatch, 'create').resolves(matchMock.sequelizeMatch as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(matchMock.match);
    });

    it('should return with unauthorized if no token was sent', async function() {
      const { status, body } = await chai
        .request(app)
        .post('/matches')

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('should return unauthorized if token is invalid', async function() {
      sinon.stub(jwt, 'verify').throws();

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', 'invalid token');

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('should return bad request if homeTeamGoals was not sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          awayTeamGoals: 1,
          homeTeamId: 1,
          awayTeamId: 2,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'homeTeamGoals is required' });
    });

    it('should return bad request if awayTeamGoals was not sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamGoals: 1,
          homeTeamId: 1,
          awayTeamId: 2,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'awayTeamGoals is required' });
    });

    it('should return bad request if homeTeamId was not sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
          awayTeamId: 2,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'homeTeamId is required' });
    });

    it('should return bad request if awayTeamId was not sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          awayTeamGoals: 1,
          homeTeamId: 1,
          homeTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'awayTeamId is required' });
    });

    it('should return unprocessable content if ids are equal', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamId: 1,
          awayTeamId: 1,
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });

    it('should return not found content if a invalid id was sent', async function() {
      sinon.stub(jwt, 'verify').returns(userMock.user as any);
      sinon.stub(SequelizeTeam, 'findAll').resolves([]);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamId: 9129,
          awayTeamId: 1,
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set('Authorization', 'valid token');

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });
  });
});
