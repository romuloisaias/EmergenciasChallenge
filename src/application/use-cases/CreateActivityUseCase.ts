import { IActivityRepository } from '@domain/repositories/IActivityRepository';
import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { CreateActivityDTO } from '../dtos/ActivityDTOs';
import { AppError } from '@shared/errors/AppError';

export class CreateActivityUseCase {
  constructor(
    private activityRepository: IActivityRepository,
    private personRepository: IPersonRepository,
  ) { }

  /**
   * Registers a new activity for a specific contact.
   * @param data The activity details including contact ID, type, date, and description.
   * @returns The created activity entity.
   * @throws AppError if the contact does not exist.
   */
  async execute(data: CreateActivityDTO) {
    const person = await this.personRepository.findById(data.personId);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    const activity = await this.activityRepository.create({
      ...data,
      activityDate: new Date(data.activityDate),
    });

    return activity;
  }
}
