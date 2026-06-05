import { Router } from 'express';
import { ActivityController } from '../controllers/ActivityController';

const activityRouter = Router();
const controller = new ActivityController();

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity for a contact
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [personId, activityType, activityDate]
 *             properties:
 *               personId: { type: integer }
 *               activityType: { type: string, enum: [call, meeting, email] }
 *               activityDate: { type: string, format: date-time }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Activity created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
activityRouter.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /activities/search:
 *   get:
 *     summary: Search activities by contact and type
 *     tags: [Activities]
 *     parameters:
 *       - in: query
 *         name: personId
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: activityType
 *         required: true
 *         schema: { type: string, enum: [call, meeting, email] }
 *     responses:
 *       200:
 *         description: List of activities with contact details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
activityRouter.get('/search', (req, res) => controller.search(req, res));

export { activityRouter };
