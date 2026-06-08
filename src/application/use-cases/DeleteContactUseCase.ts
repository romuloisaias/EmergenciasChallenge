import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { AppError } from '@shared/errors/AppError';

export class DeleteContactUseCase {
  constructor(private personRepository: IPersonRepository) { }

  /**
   * Removes a contact from the agenda.
   * @param id The unique identifier of the contact.
   * @throws AppError if the contact is not found.
   */
  async execute(id: number) {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    await this.personRepository.delete(id);
  }
}
