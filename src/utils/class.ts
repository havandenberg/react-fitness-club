import * as firebase from 'firebase';
import * as moment from 'moment';
import * as R from 'ramda';
import { CalendarEvent } from '../types/calendar-event';
import { ClassInst } from '../types/class';
import { Division, Program } from '../types/program';
import { SpecialEvent } from '../types/special-event';
import { formatDescriptiveDate } from './calendar-event';
import { getDivisionById, getProgramById } from './program';

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

export const openSpecialEventClass = (
  classInst: ClassInst,
  specialEventId: string,
) => {
  return firebase
    .database()
    .ref(`/specialEvents/${specialEventId}/classes/${classInst.id}`)
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

export const getDivisionClassInstById = (
  classInstId: string,
  division: Division,
) =>
  division.classes.find((classInst: ClassInst) =>
    R.equals(classInstId, classInst.id),
  );

export const getSpecialEventClassInstById = (
  classInstId: string,
  specialEvent: SpecialEvent,
) =>
  specialEvent.classes.find((classInst: ClassInst) =>
    R.equals(classInstId, classInst.id),
  );

export const toggleAttendingDivisionClass = (
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

export const toggleAttendingSpecialEventClass = (
  classInst: ClassInst,
  memberId: string,
  specialEventId: string,
) => {
  const classRef = firebase
    .database()
    .ref(`/specialEvents/${specialEventId}/classes/${classInst.id}`);
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

export const getClassFormattedDescription = (
  classInst: ClassInst,
  programs: Program[],
) => {
  console.log(classInst);
  const program = getProgramById(classInst.date.programId, programs);
  const division =
    program && getDivisionById(classInst.date.divisionId, program);
  return `${program ? program.name : classInst.date.programId}${
    division ? ' - ' + division.name : classInst.date.divisionId
  }: ${formatDescriptiveDate(classInst.date)}`;
};

export const getClassesAttended: (
  programs: Program[],
  memberId: string,
) => any = (programs: Program[], memberId: string) =>
  R.sortBy(
    (classInst: ClassInst) => -classInst.date.start.getTime() / 1000,
    R.flatten(
      R.map(
        (program: Program) => getProgramClassesAttended(program, memberId),
        programs,
      ),
    ),
  );

export const getProgramClassesAttended: (
  program: Program,
  memberId: string,
) => any = (program: Program, memberId: string) => {
  const classesAttended: any = R.flatten(
    R.map(
      (division: Division) => getDivisionClassesAttended(division, memberId),
      program.divisions,
    ),
  );
  return R.sortBy(
    (classInst: ClassInst) => -classInst.date.start.getTime() / 1000,
    classesAttended,
  );
};

export const getDivisionClassesAttended = (
  division: Division,
  memberId: string,
) =>
  R.sortBy(
    (classInst: ClassInst) => -classInst.date.start.getTime() / 1000,
    division.classes.filter((classInst: ClassInst) =>
      R.contains(memberId, classInst.attendanceIds),
    ),
  );
