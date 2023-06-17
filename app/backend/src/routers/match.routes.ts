import { Router } from 'express';
import MatchModel from '../models/MatchModel';
import MatchController from '../controller/MatchController';
import MatchService from '../services/MatchService';
import Validations from '../middleware/Validations';
import JWT from '../auth/JWT';
import MatchValidator from '../services/validations/MatchValidator';
import TeamModel from '../models/TeamModel';

const router = Router();

const tokenManager = new JWT();

const matchModel = new MatchModel();
const teamModel = new TeamModel();

const matchValidator = new MatchValidator(matchModel, teamModel);
const matchService = new MatchService(matchModel, matchValidator);
const matchController = new MatchController(matchService);

const middlewares = new Validations(tokenManager);

router.get('/', middlewares.validateInProgress, matchController.handleGetMatches);

router.patch(
  '/:id/finish',
  middlewares.validateToken,
  matchController.handlePatchFinishMatch,
);

router.patch(
  '/:id',
  middlewares.validateToken,
  middlewares.validateUpdateGoals,
  matchController.handlePatchMatches,
);

router.post(
  '/',
  middlewares.validateToken,
  middlewares.validateNewMatch,
  matchController.handlePostMatch,
);

export default router;
