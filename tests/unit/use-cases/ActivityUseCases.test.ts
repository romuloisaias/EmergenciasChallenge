import { CreateActivityUseCase } from '@application/use-cases/CreateActivityUseCase';
import { SearchActivitiesUseCase } from '@application/use-cases/SearchActivitiesUseCase';
import { IActivityRepository } from '@domain/repositories/IActivityRepository';
import { IPersonRepository } from '@domain/repositories/IPersonRepository';

describe('Activity Use Cases', () => {
  let activityRepository: jest.Mocked<IActivityRepository>;
  let personRepository: jest.Mocked<IPersonRepository>;

  beforeEach(() => {
    activityRepository = {
      create: jest.fn(),
      findByContactAndType: jest.fn(),
    } as any;
    personRepository = {
      findById: jest.fn(),
    } as any;
  });

  describe('CreateActivityUseCase', () => {
    it('should create an activity', async () => {
      const useCase = new CreateActivityUseCase(activityRepository, personRepository);
      const data = {
        personId: 1,
        activityType: 'call' as any,
        activityDate: '2026-06-04T10:00:00Z',
      };

      personRepository.findById.mockResolvedValue({ id: 1 } as any);
      activityRepository.create.mockResolvedValue({
        id: 10,
        ...data,
        activityDate: new Date(data.activityDate),
      });

      const result = await useCase.execute(data);
      expect(result.id).toBe(10);
      expect(activityRepository.create).toHaveBeenCalled();
    });

    it('should throw 404 if contact does not exist', async () => {
      const useCase = new CreateActivityUseCase(activityRepository, personRepository);
      personRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute({ personId: 99 } as any)).rejects.toHaveProperty(
        'statusCode',
        404,
      );
    });
  });

  describe('SearchActivitiesUseCase', () => {
    it('should return activities for a contact', async () => {
      const useCase = new SearchActivitiesUseCase(activityRepository, personRepository);
      personRepository.findById.mockResolvedValue({ id: 1 } as any);
      activityRepository.findByContactAndType.mockResolvedValue([{ id: 10 }] as any);

      const result = await useCase.execute({ personId: 1, activityType: 'call' as any });
      expect(result).toHaveLength(1);
    });

    it('should throw 404 if contact does not exist', async () => {
      const useCase = new SearchActivitiesUseCase(activityRepository, personRepository);
      personRepository.findById.mockResolvedValue(null);

      await expect(
        useCase.execute({ personId: 99, activityType: 'call' as any }),
      ).rejects.toHaveProperty('statusCode', 404);
    });
  });
});
