import { CalendarEvent } from '../utils/events';

export interface ClassInst {
  date: CalendarEvent;
  attendanceIds: string[];
  id: string;
}
