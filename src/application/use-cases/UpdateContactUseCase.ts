import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { UpdateContactDTO } from '../dtos/ContactDTOs';
import { AppError } from '@shared/errors/AppError';

export class UpdateContactUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(id: number, data: UpdateContactDTO) {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    if (data.email && data.email !== person.email) {
      const emailExists = await this.personRepository.findByEmail(data.email);
      if (emailExists) {
        throw new AppError('Correo ya está en uso', 400);
      }
    }

    return this.personRepository.update(id, {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    });
  }
}
