export interface CreateContactDTO {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phones?: {
    number: string;
    phoneTypeId: number;
  }[];
  addresses?: {
    locality: string;
    street: string;
    number: string;
    notes?: string;
  }[];
}

export interface UpdateContactDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
}

export interface SearchContactByPhoneDTO {
  number: string;
  phoneTypeId: number;
}
