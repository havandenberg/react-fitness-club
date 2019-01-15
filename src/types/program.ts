import * as R from 'ramda';
import { ClassInst } from './class';
import { Member } from './member';

export interface Program {
  assistantCoachIds: string[];
  classes: ClassInst[];
  coachId: string;
  id: string;
  logoSrc: string;
  name: string;
  members: string[];
}

export const getProgramById = (programId: string, programs: Program[]) =>
  R.find((prog: Program) => programId === prog.id, programs);

export const parsePrograms = (programs: Program[]) =>
  Object.keys(programs).map((key: string) => {
    const program = programs[key];
    return {
      ...program,
      assistantCoachIds: JSON.parse(`${program.assistantCoachIds}`),
      classes: R.values(program.classes).map((classInst: ClassInst) => ({
        ...classInst,
        date: {
          ...classInst.date,
          end: new Date(classInst.date.end),
          start: new Date(classInst.date.start),
        },
        membersAttended: JSON.parse(`${classInst.membersAttended}`),
      })),
      members: JSON.parse(`${program.members}`),
    };
  });

export const isCoachOf = (user: Member, program: Program) =>
  program.coachId === user.uid ||
  R.contains(user.uid, program.assistantCoachIds);
