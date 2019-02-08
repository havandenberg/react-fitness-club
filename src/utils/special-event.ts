import * as firebase from 'firebase';
import * as moment from 'moment';
import * as R from 'ramda';
import { CalendarEvent } from '../types/calendar-event';
import { ClassInst } from '../types/class';
import { SpecialEvent } from '../types/special-event';

export const getSpecialEventRef = (specialEventId: string) =>
  firebase.database().ref(`specialEvents/${specialEventId}`);

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

export const getMemberSignedUpEvents = (
  memberId: string,
  specialEvents: SpecialEvent[],
) =>
  specialEvents.filter((specialEvent: SpecialEvent) =>
    R.contains(memberId, specialEvent.memberIds),
  );

export const signUpForSpecialEvent = (
  memberId: string,
  specialEvent: SpecialEvent,
) => {
  if (!R.contains(memberId, specialEvent.memberIds)) {
    getSpecialEventRef(specialEvent.id).update({
      memberIds: JSON.stringify(specialEvent.memberIds.concat([memberId])),
    });
  }
};

export const removeSignup = (memberId: string, specialEvent: SpecialEvent) => {
  if (R.contains(memberId, specialEvent.memberIds)) {
    getSpecialEventRef(specialEvent.id).update({
      memberIds: JSON.stringify(
        specialEvent.memberIds.filter(
          (memId: string) => !R.equals(memId, memberId),
        ),
      ),
    });
  }
};

export const parseSpecialEvents = (specialEvents: SpecialEvent[]) =>
  Object.keys(specialEvents).map((key: string) => {
    const specialEvent = specialEvents[key];
    return {
      ...specialEvent,
      classes: R.values(specialEvent.classes).map((classInst: ClassInst) => ({
        ...classInst,
        attendanceIds: JSON.parse(`${classInst.attendanceIds}`),
        date: {
          ...classInst.date,
          end: new Date(classInst.date.end),
          start: new Date(classInst.date.start),
        },
      })),
      managerIds: JSON.parse(`${specialEvent.managerIds}`),
      memberIds: JSON.parse(`${specialEvent.memberIds}`),
    };
  });
