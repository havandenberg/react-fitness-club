import { ClassInst } from './class';

export interface SpecialEvent extends Event {
  aboutUrl: string;
  classes: ClassInst[];
  description: string;
  managerIds: string[];
  memberIds: string[];
  id: string;
  posterSrc: string;
  name: string;
  startDate: Date;
  endDate: Date;
}
