import { Event } from 'react-big-calendar';

export interface CalendarEventShape {
  description: string;
  end: {
    dateTime?: string;
    date?: string;
  };
  id: string;
  location?: string;
  recurrence?: string[];
  start: {
    dateTime?: string;
    date?: string;
  };
  summary: string;
}

export interface CalendarEvent extends Event {
  description: string;
  divisionId: string;
  end: Date;
  id: string;
  location?: string;
  recurrence?: string[];
  programId: string;
  specialEventId: string;
  start: Date;
  title: string;
}
