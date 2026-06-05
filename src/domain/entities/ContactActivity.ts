export type ActivityType = 'call' | 'meeting' | 'email';

export interface ContactActivity {
  id?: number;
  personId: number;
  activityType: ActivityType;
  activityDate: Date;
  description?: string;
  person?: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
  };
}
