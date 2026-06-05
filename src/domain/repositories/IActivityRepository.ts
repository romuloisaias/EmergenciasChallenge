import { ContactActivity, ActivityType } from '../entities/ContactActivity';

export interface IActivityRepository {
  create(activity: Omit<ContactActivity, 'id'>): Promise<ContactActivity>;
  findByContactAndType(personId: number, type: ActivityType): Promise<ContactActivity[]>;
}
