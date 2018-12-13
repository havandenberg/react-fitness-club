export type dobField = 'month' | 'day' | 'year';

export interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export interface Member {
  city: string;
  country: string;
  dateOfBirth: DateOfBirth;
  email: string;
  enrolledPrograms: string[];
  firstName: string;
  isAccountSetupComplete: boolean;
  lastName: string;
  nickname?: string;
  phone: string;
  state: string;
  streetAddress1: string;
  streetAddress2?: string;
  uid: string;
  zip: string;
}

export const newUserDefaults: Member = {
  city: '',
  country: '',
  dateOfBirth: { month: '', day: '', year: '' },
  email: '',
  enrolledPrograms: [],
  firstName: '',
  isAccountSetupComplete: false,
  lastName: '',
  nickname: '',
  phone: '',
  state: '',
  streetAddress1: '',
  streetAddress2: '',
  uid: '',
  zip: '',
};
