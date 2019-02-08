import * as moment from 'moment';
import * as R from 'ramda';
import { rrulestr } from 'rrule';
import { CalendarEvent, CalendarEventShape } from '../types/calendar-event';

const MAX_RECURRENCES = 50;

const GET_CAL_URL = (calID: string, key: string) =>
  `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?fields=items(summary,id,location,start,end,recurrence,description)&key=${key}`;

export const expandRecurringEvents: (
  events: CalendarEventShape[],
) => CalendarEvent[] = events => {
  const occurrences: CalendarEvent[] = [];
  events.map((event: CalendarEventShape) => {
    const startDate = new Date(event.start.date || event.start.dateTime || '');
    const endDate = new Date(event.end.date || event.end.dateTime || '');
    const ids = event.description ? event.description.split(':') : [];
    const programId = ids.length > 0 ? ids[0] : '';
    const divisionId = ids.length > 1 ? ids[1] : '';

    if (event.recurrence && !R.isEmpty(event.recurrence)) {
      const startMoment = moment.utc(startDate);
      const endMoment = moment.utc(endDate);
      const hourDiff = moment.duration(endMoment.diff(startMoment)).asHours();
      rrulestr(
        `DTSTART:${startMoment.format('YYYYMMDD')}T${startMoment.format(
          'HHmmss',
        )}Z\n${event.recurrence[0]}`,
      )
        .all((date: Date, i: number) => i < MAX_RECURRENCES)
        .map((date: Date) => {
          occurrences.push({
            ...event,
            divisionId,
            end: moment(date)
              .add(hourDiff, 'hours')
              .toDate(),
            programId,
            start: date,
            title: event.summary,
          });
        });
    } else {
      occurrences.push({
        ...event,
        divisionId,
        end: endDate,
        programId,
        start: startDate,
        title: event.summary,
      });
    }
  });
  return occurrences;
};

export const getEvents = () =>
  fetch(
    GET_CAL_URL(
      process.env.REACT_APP_GCAL_ID || '',
      process.env.REACT_APP_GCAL_KEY || '',
    ),
  ).then(res => res.json());

export const getSpecialCalendarEvents = (events: CalendarEvent[]) =>
  events.filter((event: CalendarEvent) => R.equals(event.divisionId, 'event'));

export const getProgramIdFromEvent = (event: CalendarEvent) =>
  event.description
    ? event.description.substr(0, event.description.indexOf(':'))
    : '';

export const formatDescriptiveDate = (date: CalendarEvent) => `${moment(
  date.start,
).format('ddd MMM Do, h:mm')}-
${moment(date.end).format('h:mma')}`;
