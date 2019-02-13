import { ClassInst } from './class';

export interface Coach {
  bio: string;
  id: string;
  name: string;
  profilePhotoUrl: string;
}

export interface Division {
  classes: ClassInst[];
  discountMultiplier?: number;
  discountMonths?: number;
  id: string;
  memberIds: string[];
  monthlyCost?: number;
  name: string;
}

export interface Program {
  aboutUrl: string;
  assistantCoachIds: string[];
  coachId: string;
  discountMultiplier?: number;
  discountMonths?: number;
  divisions: Division[];
  eventBackground: string;
  eventColor: string;
  id: string;
  logoSrc: string;
  monthlyCost: number;
  name: string;
}
