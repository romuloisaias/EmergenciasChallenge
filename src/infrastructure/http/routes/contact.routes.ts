import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

const contactRouter = Router();
const controller = new ContactController();

contactRouter.post('/', (req, res) => controller.create(req, res));
contactRouter.get('/email/:email', (req, res) => controller.getByEmail(req, res));
contactRouter.get('/search', (req, res) => controller.search(req, res));
contactRouter.get('/search/phone', (req, res) => controller.searchByPhone(req, res));
contactRouter.put('/:id', (req, res) => controller.update(req, res));
contactRouter.delete('/:id', (req, res) => controller.delete(req, res));

export { contactRouter };
