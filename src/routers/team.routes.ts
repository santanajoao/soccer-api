import { Router } from 'express';
import TeamDataHandler from '../services/helpers/TeamDataHandler';
import TeamModel from '../models/TeamModel';
import TeamController from '../controller/TeamController';
import TeamService from '../services/TeamService';

const router = Router();

const teamDataHandler = new TeamDataHandler();

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel, teamDataHandler);
const teamController = new TeamController(teamService);

router.get('/', teamController.handleGetTeams);
router.get('/:id', teamController.handleGetTeamById);

export default router;
