import { ClassInst } from './class';

export interface Coach {
  bio: string;
  id: string;
  name: string;
  profilePhotoUrl: string;
}

export interface Division {
  classes: ClassInst[];
  id: string;
  memberIds: string[];
  cost?: string;
  name: string;
}

export interface Program {
  aboutUrl: string;
  coachIds: string[];
  divisions: Division[];
  eventBackground: string;
  eventColor: string;
  id: string;
  logoSrc: string;
  cost: string;
  name: string;
  noMembershipRequired?: boolean;
}

export interface ProgramContent {
  description: string;
  id: string;
  name: string;
}
