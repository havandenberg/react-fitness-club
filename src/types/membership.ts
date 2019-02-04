export interface InactivePeriod {
  start: Date;
  end: Date | '';
}

export type MembershipType =
  | 'cancelled'
  | 'coach'
  | 'multipass'
  | 'react'
  | 'capoeira'
  | 'aikido'
  | 'student'
  | 'sponsored'
  | '';

export interface Membership {
  inactivePeriods: InactivePeriod[];
  signupDate: Date | '';
  type: MembershipType;
}

export const MULTI_PROGRAM_MEMBERSHIPS = [
  'coach',
  'multipass',
  'sponsored',
  'student',
];
