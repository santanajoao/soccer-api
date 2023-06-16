import { Router } from 'express';
import MatchModel from '../models/MatchModel';
import MatchController from '../controller/MatchController';
import MatchService from '../services/MatchService';

const router = Router();

const matchModel = new MatchModel();
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);

router.get('/', matchController.handleGetMatches);

export default router;
