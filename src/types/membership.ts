export interface InactivePeriod {
  start: Date;
  end: Date | '';
}

export type MembershipType =
  | 'cancelled'
  | 'coach'
  | 'multipass'
  | 'sponsored'
  | 'student'
  | 'aikido'
  | 'capoeira'
  | 'qigong-meditation'
  | 'react-mma'
  | 'react-skillz'
  | 'taekwondo'
  | 'zumba'
  | '';

export interface Membership {
  cost?: string;
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
