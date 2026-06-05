import { Request, Response } from 'express';
import { PrismaPersonRepository } from '@infrastructure/database/PrismaPersonRepository';
import { CreateContactUseCase } from '@application/use-cases/CreateContactUseCase';
import { UpdateContactUseCase } from '@application/use-cases/UpdateContactUseCase';
import { DeleteContactUseCase } from '@application/use-cases/DeleteContactUseCase';
import { GetContactByEmailUseCase } from '@application/use-cases/GetContactByEmailUseCase';
import { SearchContactsUseCase } from '@application/use-cases/SearchContactsUseCase';
import { SearchContactByPhoneUseCase } from '@application/use-cases/SearchContactByPhoneUseCase';
import {
  createContactSchema,
  updateContactSchema,
  searchContactByPhoneSchema,
} from '../middlewares/validators';

export class ContactController {
  private personRepository = new PrismaPersonRepository();

  async create(req: Request, res: Response) {
    const data = createContactSchema.parse(req.body);
    const useCase = new CreateContactUseCase(this.personRepository);
    const contact = await useCase.execute(data);
    return res.status(201).json(contact);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = updateContactSchema.parse(req.body);
    const useCase = new UpdateContactUseCase(this.personRepository);
    const contact = await useCase.execute(id, data);
    return res.json(contact);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const useCase = new DeleteContactUseCase(this.personRepository);
    await useCase.execute(id);
    return res.status(204).send();
  }

  async getByEmail(req: Request, res: Response) {
    const email = req.params.email as string;
    const useCase = new GetContactByEmailUseCase(this.personRepository);
    const contact = await useCase.execute(email);
    return res.json(contact);
  }

  async search(req: Request, res: Response) {
    const { firstName, lastName } = req.query as { firstName?: string; lastName?: string };
    const useCase = new SearchContactsUseCase(this.personRepository);
    const contacts = await useCase.execute({ firstName, lastName });
    return res.json(contacts);
  }

  async searchByPhone(req: Request, res: Response) {
    const data = searchContactByPhoneSchema.parse(req.query);
    const useCase = new SearchContactByPhoneUseCase(this.personRepository);
    const contacts = await useCase.execute(data);
    return res.json(contacts);
  }
}
