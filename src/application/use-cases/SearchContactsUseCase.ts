import { IPersonRepository } from '@domain/repositories/IPersonRepository';

export class SearchContactsUseCase {
  constructor(private personRepository: IPersonRepository) { }

  /**
   * Searches for contacts based on personal data filters.
   * @param filters Partial name or last name filters.
   * @returns A list of matching contacts.
   */
  async execute(filters: { firstName?: string; lastName?: string }) {
    return this.personRepository.findByPersonalData(filters);
  }
}
