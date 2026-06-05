import { ActivityType } from '@domain/entities/ContactActivity';

export interface CreateActivityDTO {
  personId: number;
  activityType: ActivityType;
  activityDate: string;
  description?: string;
}

export interface SearchActivityDTO {
  personId: number;
  activityType: ActivityType;
}
