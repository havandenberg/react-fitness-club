import * as firebase from 'firebase';
import * as moment from 'moment';
import * as R from 'ramda';
import { CalendarEvent } from '../types/calendar-event';
import { SpecialEvent } from '../types/special-event';

export const getSpecialEventRef = (specialEventId: string) =>
  firebase.database().ref(`specialEvents/${specialEventId}`);

export const getSpecialEventById = (
  specialEventId: string,
  specialEvents: SpecialEvent[],
) =>
  R.find(
    (specialEvent: SpecialEvent) => specialEventId === specialEvent.id,
    specialEvents,
  );

export const getSpecialEventSessions = (
  specialEvent: SpecialEvent,
  calendarEvents: CalendarEvent[],
) =>
  R.sortBy((event: CalendarEvent) => moment(event.start).unix())(
    calendarEvents.filter(
      (event: CalendarEvent) =>
        event.description && R.contains(specialEvent.id, event.description),
    ),
  );

export const getUpcomingSpecialEvents = (specialEvents: SpecialEvent[]) =>
  specialEvents.filter(
    (event: SpecialEvent) => moment().diff(event.startDate) < 0,
  );

export const getPastSpecialEvents = (specialEvents: SpecialEvent[]) =>
  specialEvents.filter(
    (event: SpecialEvent) => moment().diff(event.startDate) >= 0,
  );

export const sortSpecialEventsByDate = (specialEvents: SpecialEvent[]) =>
  R.sortBy(
    (event: SpecialEvent) => moment(event.startDate).unix(),
    specialEvents,
  );

export const parseSpecialEvents = (specialEvents: SpecialEvent[]) =>
  Object.keys(specialEvents).map((key: string) => {
    const specialEvent = specialEvents[key];
    return {
      ...specialEvent,
      endDate: new Date(specialEvent.endDate),
      startDate: new Date(specialEvent.startDate),
    };
  });
