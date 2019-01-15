import { CalendarEvent } from '../utils/events';

export interface ClassInst {
  date: CalendarEvent;
  membersAttended: string[];
  id: string;
}
