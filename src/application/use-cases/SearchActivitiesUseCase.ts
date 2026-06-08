import { IActivityRepository } from '@domain/repositories/IActivityRepository';
import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { SearchActivityDTO } from '../dtos/ActivityDTOs';
import { AppError } from '@shared/errors/AppError';

export class SearchActivitiesUseCase {
  constructor(
    private activityRepository: IActivityRepository,
    private personRepository: IPersonRepository,
  ) { }

  /**
   * Retrieves activities filtered by contact and type.
   * @param data Filter criteria including contact ID and activity type.
   * @returns A list of activities with contact details.
   * @throws AppError if the contact does not exist.
   */
  async execute(data: SearchActivityDTO) {
    const person = await this.personRepository.findById(data.personId);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    return this.activityRepository.findByContactAndType(data.personId, data.activityType);
  }
}
