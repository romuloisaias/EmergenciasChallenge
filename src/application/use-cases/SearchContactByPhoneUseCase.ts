import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { SearchContactByPhoneDTO } from '../dtos/ContactDTOs';

export class SearchContactByPhoneUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(data: SearchContactByPhoneDTO) {
    return this.personRepository.findByPhone(data.number, data.phoneTypeId);
  }
}
