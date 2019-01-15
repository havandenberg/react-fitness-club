import * as firebase from 'firebase';
import * as moment from 'moment';
import * as R from 'ramda';
import { ClassInst } from '../types/class';
import { Member } from '../types/member';
import { Program } from '../types/program';
import { CalendarEvent } from './events';

export const openClass = (classInst: ClassInst, program: Program) => {
  return firebase
    .database()
    .ref(`/programs/${program.id}/classes/${classInst.id}`)
    .set({
      ...classInst,
      date: {
        ...classInst.date,
        end: classInst.date.end.toJSON(),
        start: classInst.date.start.toJSON(),
      },
      membersAttended: JSON.stringify(classInst.membersAttended),
    });
};

export const generateNewClass = (event: CalendarEvent, member: Member) => ({
  date: event,
  id: getClassInstIdFromEvent(event),
  membersAttended: [member.uid],
});

export const getClassInstIdFromEvent = (event: CalendarEvent) =>
  moment(event.start).format('YYYYMMDDhhmma');

export const getClassInstById = (classInstId: string, program: Program) =>
  program.classes.find((classInst: ClassInst) =>
    R.equals(classInstId, classInst.id),
  );

export const toggleAttendingClass = (
  member: Member,
  program: Program,
  classInst: ClassInst,
) => {
  const classRef = firebase
    .database()
    .ref(`/programs/${program.id}/classes/${classInst.id}`);
  if (R.contains(member.uid, classInst.membersAttended)) {
    classRef.update({
      membersAttended: JSON.stringify(
        classInst.membersAttended.filter(
          (memberId: string) => memberId !== member.uid,
        ),
      ),
    });
  } else {
    classRef.update({
      membersAttended: JSON.stringify(
        classInst.membersAttended.concat(member.uid),
      ),
    });
  }
};
