import { IPersonRepository } from '@domain/repositories/IPersonRepository';
import { Person } from '@domain/entities/Person';
import { prisma } from './prisma';

export class PrismaPersonRepository implements IPersonRepository {
  async create(data: Omit<Person, 'id' | 'createdAt' | 'updatedAt'>): Promise<Person> {
    const person = await prisma.person.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        phones: {
          create: data.phones?.map((p) => ({ number: p.number, phoneTypeId: p.phoneTypeId })),
        },
        addresses: {
          create: data.addresses?.map((a) => ({
            locality: a.locality,
            street: a.street,
            number: a.number,
            notes: a.notes,
          })),
        },
      },
      include: {
        phones: { include: { phoneType: true } },
        addresses: true,
      },
    });

    return person;
  }

  async findById(id: number): Promise<Person | null> {
    return prisma.person.findUnique({
      where: { id },
      include: { phones: { include: { phoneType: true } }, addresses: true },
    });
  }

  async findByEmail(email: string): Promise<Person | null> {
    return prisma.person.findUnique({
      where: { email },
      include: { phones: { include: { phoneType: true } }, addresses: true },
    });
  }

  async findByPersonalData(
    data: Partial<Pick<Person, 'firstName' | 'lastName'>>,
  ): Promise<Person[]> {
    return prisma.person.findMany({
      where: {
        AND: [
          data.firstName ? { firstName: { contains: data.firstName, mode: 'insensitive' } } : {},
          data.lastName ? { lastName: { contains: data.lastName, mode: 'insensitive' } } : {},
        ],
      },
      include: { phones: { include: { phoneType: true } }, addresses: true },
    });
  }

  async findByPhone(number: string, phoneTypeId: number): Promise<Person[]> {
    return prisma.person.findMany({
      where: {
        phones: {
          some: {
            number: { contains: number },
            phoneTypeId,
          },
        },
      },
      include: { phones: { include: { phoneType: true } }, addresses: true },
    });
  }

  async update(
    id: number,
    data: Partial<Omit<Person, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Person> {
    return prisma.person.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
      },
      include: { phones: { include: { phoneType: true } }, addresses: true },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.person.delete({
      where: { id },
    });
  }
}
