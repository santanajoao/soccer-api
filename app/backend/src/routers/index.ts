import { Router } from 'express';
import teamRotes from './team.routes';
import loginRoutes from './login.routes';

const router = Router();

router.use('/teams', teamRotes);
router.use('/login', loginRoutes);

export default router;
