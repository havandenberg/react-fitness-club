import { CalendarEvent } from '../types/calendar-event';

export interface ClassInst {
  date: CalendarEvent;
  attendanceIds: string[];
  id: string;
}
