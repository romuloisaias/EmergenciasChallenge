import { Router } from 'express';
import { contactRouter } from './contact.routes';
import { activityRouter } from './activity.routes';

const routes = Router();

routes.use('/contacts', contactRouter);
routes.use('/activities', activityRouter);

export { routes };
