import { Router } from 'express';
import teamRotes from './team.routes';

const router = Router();

router.use('/teams', teamRotes);

export default router;
