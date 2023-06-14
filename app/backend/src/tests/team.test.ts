import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import teamMock from './mocks/team.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team integration tests', function() {
  describe('GET /teams', function() {
    it('should return the team list', async function() {
      sinon.stub(SequelizeTeam, 'findAll')
        .resolves(teamMock.teamListWithExtraProps as any);

      const { status, body } = await chai.request(app).get('/teams');
      
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teamMock.teamList);
    });
  });
});
