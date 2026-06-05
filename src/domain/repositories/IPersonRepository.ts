import { Person } from '../entities/Person';

export interface IPersonRepository {
  create(person: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person>;
  findById(id: number): Promise<Person | null>;
  findByEmail(email: string): Promise<Person | null>;
  findByPersonalData(data: Partial<Pick<Person, 'firstName' | 'lastName'>>): Promise<Person[]>;
  findByPhone(number: string, phoneTypeId: number): Promise<Person[]>;
  update(
    id: number,
    data: Partial<Omit<Person, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Person>;
  delete(id: number): Promise<void>;
}
