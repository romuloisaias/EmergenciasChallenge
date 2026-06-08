import { Router } from 'express';
import { ActivityController } from '../controllers/ActivityController';

const activityRouter = Router();
const controller = new ActivityController();

activityRouter.post('/', (req, res) => controller.create(req, res));
activityRouter.get('/search', (req, res) => controller.search(req, res));

export { activityRouter };
