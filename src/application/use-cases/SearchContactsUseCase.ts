import { IPersonRepository } from '@domain/repositories/IPersonRepository';

export class SearchContactsUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(filters: { firstName?: string; lastName?: string }) {
    return this.personRepository.findByPersonalData(filters);
  }
}
