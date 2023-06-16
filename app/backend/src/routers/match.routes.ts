import { Router } from 'express';
import MatchModel from '../models/MatchModel';
import MatchController from '../controller/MatchController';
import MatchService from '../services/MatchService';
import Validations from '../middleware/Validations';
import JWT from '../auth/JWT';

const router = Router();

const tokenManager = new JWT();

const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);
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
  middlewares.validateUpdateGoals,
  middlewares.validateToken,
  matchController.handlePatchMatches,
);

export default router;
