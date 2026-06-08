import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { CreateContactDTO } from '../dtos/ContactDTOs';
import { AppError } from '@shared/errors/AppError';

export class CreateContactUseCase {
  constructor(private personRepository: IPersonRepository) { }

  /**
   * Executes the creation of a new contact.
   * @param data The contact data including names, email, birth date, phones, and addresses.
   * @returns The created contact entity.
   * @throws AppError if the email is already in use.
   */
  async execute(data: CreateContactDTO) {
    const emailExists = await this.personRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError('Email ya está en uso', 400);
    }

    const person = await this.personRepository.create({
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
    });

    return person;
  }
}
