import { ASSETS_PATH } from '../utils/constants';
import { Membership } from './membership';

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
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;
  };
  firstName: string;
  isAccountSetupComplete: boolean;
  isLiabilityWaiverSigned: boolean;
  lastName: string;
  medicalConditions: string;
  membership: Membership;
  nickname: string;
  pastMemberships: Membership[];
  phone: string;
  profilePhotoUrl: string;
  squareCustomerId: string;
  state: string;
  streetAddress1: string;
  streetAddress2: string;
  uid: string;
  zip: string;
}

export const newMemberDefaults: Member = {
  allergies: '',
  city: '',
  dateOfBirth: { month: '', day: '', year: '' },
  email: '',
  emergencyContact: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    relationship: '',
  },
  firstName: '',
  isAccountSetupComplete: false,
  isLiabilityWaiverSigned: false,
  lastName: '',
  medicalConditions: '',
  membership: {
    inactivePeriods: [],
    signupDate: '',
    type: '',
  },
  nickname: '',
  pastMemberships: [],
  phone: '',
  profilePhotoUrl: `${ASSETS_PATH}/default-profile.png`,
  squareCustomerId: '',
  state: '',
  streetAddress1: '',
  streetAddress2: '',
  uid: '',
  zip: '',
};
