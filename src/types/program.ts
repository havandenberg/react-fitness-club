import { ClassInst } from './class';

export interface Division {
  classes: ClassInst[];
  id: string;
  memberIds: string[];
  name: string;
}

export interface Program {
  assistantCoachIds: string[];
  coachId: string;
  divisions: Division[];
  id: string;
  logoSrc: string;
  name: string;
}
