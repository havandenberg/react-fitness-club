export interface Member {
  city: string;
  dateOfBirth: Date | null;
  email: string;
  enrolledPrograms: string[];
  firstName: string;
  isAccountSetupComplete: boolean;
  lastName: string;
  nickname?: string;
  state: string;
  streetAddress1: string;
  streetAddress2?: string;
  zip: string;
}

export const newUserDefaults: Member = {
  city: '',
  dateOfBirth: null,
  email: '',
  enrolledPrograms: [],
  firstName: '',
  isAccountSetupComplete: false,
  lastName: '',
  nickname: '',
  state: '',
  streetAddress1: '',
  streetAddress2: '',
  zip: '',
};
