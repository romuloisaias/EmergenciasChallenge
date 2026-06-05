import { CreateContactUseCase } from '@application/use-cases/CreateContactUseCase';
import { GetContactByEmailUseCase } from '@application/use-cases/GetContactByEmailUseCase';
import { SearchContactsUseCase } from '@application/use-cases/SearchContactsUseCase';
import { SearchContactByPhoneUseCase } from '@application/use-cases/SearchContactByPhoneUseCase';
import { UpdateContactUseCase } from '@application/use-cases/UpdateContactUseCase';
import { DeleteContactUseCase } from '@application/use-cases/DeleteContactUseCase';
import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { AppError } from '@shared/errors/AppError';

describe('Contact Use Cases', () => {
  let personRepository: jest.Mocked<IPersonRepository>;

  beforeEach(() => {
    personRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByPersonalData: jest.fn(),
      findByPhone: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
  });

  describe('CreateContactUseCase', () => {
    it('should create a new contact', async () => {
      const useCase = new CreateContactUseCase(personRepository);
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
      };

      personRepository.findByEmail.mockResolvedValue(null);
      personRepository.create.mockResolvedValue({
        id: 1,
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
      });

      const result = await useCase.execute(data);
      expect(result.id).toBe(1);
      expect(personRepository.create).toHaveBeenCalled();
    });

    it('should throw error if email exists', async () => {
      const useCase = new CreateContactUseCase(personRepository);
      personRepository.findByEmail.mockResolvedValue({ id: 1 } as any);

      await expect(useCase.execute({ email: 'exists@test.com' } as any)).rejects.toBeInstanceOf(
        AppError,
      );
    });
  });

  describe('GetContactByEmailUseCase', () => {
    it('should return a contact by email', async () => {
      const useCase = new GetContactByEmailUseCase(personRepository);
      personRepository.findByEmail.mockResolvedValue({ id: 1, email: 'test@test.com' } as any);

      const result = await useCase.execute('test@test.com');
      expect(result.id).toBe(1);
    });

    it('should throw 404 if not found', async () => {
      const useCase = new GetContactByEmailUseCase(personRepository);
      personRepository.findByEmail.mockResolvedValue(null);

      await expect(useCase.execute('none@test.com')).rejects.toHaveProperty('statusCode', 404);
    });
  });

  describe('UpdateContactUseCase', () => {
    it('should update a contact', async () => {
      const useCase = new UpdateContactUseCase(personRepository);
      personRepository.findById.mockResolvedValue({ id: 1, email: 'old@test.com' } as any);
      personRepository.update.mockResolvedValue({ id: 1, firstName: 'New' } as any);

      const result = await useCase.execute(1, { firstName: 'New' });
      expect(result.firstName).toBe('New');
    });

    it('should throw error if email taken by another', async () => {
      const useCase = new UpdateContactUseCase(personRepository);
      personRepository.findById.mockResolvedValue({ id: 1, email: 'old@test.com' } as any);
      personRepository.findByEmail.mockResolvedValue({ id: 2, email: 'taken@test.com' } as any);

      await expect(useCase.execute(1, { email: 'taken@test.com' })).rejects.toBeInstanceOf(
        AppError,
      );
    });
  });

  describe('DeleteContactUseCase', () => {
    it('should delete a contact', async () => {
      const useCase = new DeleteContactUseCase(personRepository);
      personRepository.findById.mockResolvedValue({ id: 1 } as any);

      await useCase.execute(1);
      expect(personRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw 404 if not found', async () => {
      const useCase = new DeleteContactUseCase(personRepository);
      personRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(1)).rejects.toHaveProperty('statusCode', 404);
    });
  });

  describe('SearchContactsUseCase', () => {
    it('should return contacts based on filters', async () => {
      const useCase = new SearchContactsUseCase(personRepository);
      personRepository.findByPersonalData.mockResolvedValue([{ id: 1, firstName: 'John' }] as any);

      const result = await useCase.execute({ firstName: 'John' });
      expect(result).toHaveLength(1);
      expect(personRepository.findByPersonalData).toHaveBeenCalledWith({ firstName: 'John' });
    });
  });

  describe('SearchContactByPhoneUseCase', () => {
    it('should return contacts by phone number and type', async () => {
      const useCase = new SearchContactByPhoneUseCase(personRepository);
      personRepository.findByPhone.mockResolvedValue([{ id: 1 }] as any);

      const result = await useCase.execute({ number: '123', phoneTypeId: 1 });
      expect(result).toHaveLength(1);
      expect(personRepository.findByPhone).toHaveBeenCalledWith('123', 1);
    });
  });
});
