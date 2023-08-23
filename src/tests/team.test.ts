import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import teamMock from './mocks/team.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team integration tests', function() {
  beforeEach(sinon.restore)

  describe('GET /teams', function() {
    it('should return the team list', async function() {
      sinon.stub(SequelizeTeam, 'findAll')
        .resolves(teamMock.sequelizeTeamList as any);

      const { status, body } = await chai.request(app).get('/teams');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teamMock.teamList);
    });
  });

  describe('GET /teams/:id', function() {
    it('should return the team case id is valid', async function() {
      sinon.stub(SequelizeTeam, 'findByPk')
        .resolves(teamMock.sequelizeTeam as any);

      const { status, body } = await chai.request(app).get('/teams/id');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teamMock.team);
    });

    it('should return not found case id is invalid', async function() {
      sinon.stub(SequelizeTeam, 'findByPk')
        .resolves(undefined);

      const { status, body } = await chai.request(app).get('/teams/id');
      
      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Team not found' });
    });
  });
});
