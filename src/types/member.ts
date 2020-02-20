export type dobField = 'month' | 'day' | 'year';

export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface Member {
  allergies: string;
  city: string;
  dateOfBirth: DateOfBirth;
  email: string;
  emergencyContact: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  firstName: string;
  lastName: string;
  medicalConditions: string;
  nickname: string;
  phone: string;
  state: string;
  streetAddress1: string;
  streetAddress2: string;
  zip: string;
}

export const newMemberDefaults: Member = {
  allergies: '',
  city: '',
  dateOfBirth: { month: '', day: '', year: '' },
  email: '',
  emergencyContact: {
    firstName: '',
    lastName: '',
    phone: '',
  },
  firstName: '',
  lastName: '',
  medicalConditions: '',
  nickname: '',
  phone: '',
  state: '',
  streetAddress1: '',
  streetAddress2: '',
  zip: '',
};
