import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { AppError } from '@shared/errors/AppError';

export class GetContactByEmailUseCase {
  constructor(private personRepository: IPersonRepository) { }

  /**
   * Finds a single contact by their email address.
   * @param email The email to search for.
   * @returns The contact entity.
   * @throws AppError if the contact is not found.
   */
  async execute(email: string) {
    const person = await this.personRepository.findByEmail(email);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    return person;
  }
}
