import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { SearchContactByPhoneDTO } from '../dtos/ContactDTOs';

export class SearchContactByPhoneUseCase {
  constructor(private personRepository: IPersonRepository) { }

  /**
   * Searches for contacts based on phone number and type.
   * @param data Phone number and phone type ID filters.
   * @returns A list of matching contacts.
   */
  async execute(data: SearchContactByPhoneDTO) {
    return this.personRepository.findByPhone(data.number, data.phoneTypeId);
  }
}
