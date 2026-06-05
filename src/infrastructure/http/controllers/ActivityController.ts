import { Request, Response } from 'express';
import { PrismaActivityRepository } from '@infrastructure/database/PrismaActivityRepository';
import { PrismaPersonRepository } from '@infrastructure/database/PrismaPersonRepository';
import { CreateActivityUseCase } from '@application/use-cases/CreateActivityUseCase';
import { SearchActivitiesUseCase } from '@application/use-cases/SearchActivitiesUseCase';
import { createActivitySchema, searchActivitySchema } from '../middlewares/validators';

export class ActivityController {
  private activityRepository = new PrismaActivityRepository();
  private personRepository = new PrismaPersonRepository();

  async create(req: Request, res: Response) {
    const data = createActivitySchema.parse(req.body);
    const useCase = new CreateActivityUseCase(this.activityRepository, this.personRepository);
    const activity = await useCase.execute(data);
    return res.status(201).json(activity);
  }

  async search(req: Request, res: Response) {
    const data = searchActivitySchema.parse(req.query);
    const useCase = new SearchActivitiesUseCase(this.activityRepository, this.personRepository);
    const activities = await useCase.execute(data);
    return res.json(activities);
  }
}
