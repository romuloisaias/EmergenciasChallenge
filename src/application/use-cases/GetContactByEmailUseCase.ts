import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { AppError } from '@shared/errors/AppError';

export class GetContactByEmailUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(email: string) {
    const person = await this.personRepository.findByEmail(email);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    return person;
  }
}
