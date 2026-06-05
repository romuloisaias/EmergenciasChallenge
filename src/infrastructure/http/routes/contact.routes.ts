import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

const contactRouter = Router();
const controller = new ContactController();

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, dateOfBirth]
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               dateOfBirth: { type: string, format: date }
 *               phones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     number: { type: string }
 *                     phoneTypeId: { type: integer }
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     locality: { type: string }
 *                     street: { type: string }
 *                     number: { type: string }
 *                     notes: { type: string }
 *     responses:
 *       201:
 *         description: Contact created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 */
contactRouter.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /contacts/email/{email}:
 *   get:
 *     summary: Get contact by email
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Contact found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 */
contactRouter.get('/email/:email', (req, res) => controller.getByEmail(req, res));

/**
 * @swagger
 * /contacts/search:
 *   get:
 *     summary: Search contacts by personal data
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema: { type: string }
 *       - in: query
 *         name: lastName
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
contactRouter.get('/search', (req, res) => controller.search(req, res));

/**
 * @swagger
 * /contacts/search/phone:
 *   get:
 *     summary: Search contacts by phone
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: number
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: phoneTypeId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
contactRouter.get('/search/phone', (req, res) => controller.searchByPhone(req, res));

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update contact data
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string }
 *               lastName: { type: string }
 *               email: { type: string }
 *               dateOfBirth: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Contact updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 */
contactRouter.put('/:id', (req, res) => controller.update(req, res));

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Contact deleted
 */
contactRouter.delete('/:id', (req, res) => controller.delete(req, res));

export { contactRouter };
