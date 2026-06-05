import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { AppError } from '@shared/errors/AppError';

export class DeleteContactUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(id: number) {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new AppError('Contacto no encontrado', 404);
    }

    await this.personRepository.delete(id);
  }
}
