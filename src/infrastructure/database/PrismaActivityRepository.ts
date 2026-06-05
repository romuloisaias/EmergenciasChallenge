import { IActivityRepository } from '@domain/repositories/IActivityRepository';
import { ContactActivity, ActivityType } from '@domain/entities/ContactActivity';
import { prisma } from './prisma';

export class PrismaActivityRepository implements IActivityRepository {
  async create(data: Omit<ContactActivity, 'id'>): Promise<ContactActivity> {
    const activity = await prisma.contactActivity.create({
      data: {
        personId: data.personId,
        activityType: data.activityType,
        activityDate: data.activityDate,
        description: data.description,
      },
    });

    return activity as ContactActivity;
  }

  async findByContactAndType(personId: number, type: ActivityType): Promise<ContactActivity[]> {
    const activities = await prisma.contactActivity.findMany({
      where: {
        personId,
        activityType: type,
      },
      include: {
        person: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return activities as ContactActivity[];
  }
}
