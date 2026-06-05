export interface Phone {
  id?: number;
  number: string;
  phoneTypeId: number;
  phoneType?: {
    typeName: string;
  };
  personId?: number;
}

export interface Address {
  id?: number;
  locality: string;
  street: string;
  number: string;
  notes?: string | null;
  personId?: number;
}

export interface Person {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phones?: Phone[];
  addresses?: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
