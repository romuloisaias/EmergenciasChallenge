import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { CreateContactDTO } from '../dtos/ContactDTOs';
import { AppError } from '@shared/errors/AppError';

export class CreateContactUseCase {
  constructor(private personRepository: IPersonRepository) {}

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
