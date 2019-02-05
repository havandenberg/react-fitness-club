import * as firebase from 'firebase';
import * as moment from 'moment';
import * as R from 'ramda';
import { CalendarEvent } from '../types/calendar-event';
import { ClassInst } from '../types/class';
import { Division } from '../types/program';

export const openClass = (
  classInst: ClassInst,
  programId: string,
  divisionId: string,
) => {
  return firebase
    .database()
    .ref(
      `/programs/${programId}/divisions/${divisionId}/classes/${classInst.id}`,
    )
    .set({
      ...classInst,
      attendanceIds: JSON.stringify(classInst.attendanceIds),
      date: {
        ...classInst.date,
        end: classInst.date.end.toJSON(),
        start: classInst.date.start.toJSON(),
      },
    });
};

export const generateNewClass = (event: CalendarEvent) => ({
  attendanceIds: [],
  date: event,
  id: getClassInstIdFromEvent(event),
});

export const getClassInstIdFromEvent = (event: CalendarEvent) =>
  moment(event.start).format('YYYYMMDDhhmma');

export const getClassInstById = (classInstId: string, division: Division) =>
  division.classes.find((classInst: ClassInst) =>
    R.equals(classInstId, classInst.id),
  );

export const toggleAttendingClass = (
  classInst: ClassInst,
  memberId: string,
  programId: string,
  divisionId: string,
) => {
  const classRef = firebase
    .database()
    .ref(
      `/programs/${programId}/divisions/${divisionId}/classes/${classInst.id}`,
    );
  if (R.contains(memberId, classInst.attendanceIds)) {
    classRef.update({
      attendanceIds: JSON.stringify(
        classInst.attendanceIds.filter((memId: string) => memId !== memberId),
      ),
    });
  } else {
    classRef.update({
      attendanceIds: JSON.stringify(classInst.attendanceIds.concat(memberId)),
    });
  }
};

export const getClassesAttended = (division: Division, memberId: string) =>
  R.sortBy(
    (classInst: ClassInst) => classInst.date.start.getTime() / 1000,
    division.classes.filter((classInst: ClassInst) =>
      R.contains(memberId, classInst.attendanceIds),
    ),
  );
