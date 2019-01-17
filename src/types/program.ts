import * as R from 'ramda';
import { ClassInst } from './class';

export interface Division {
  classes: ClassInst[];
  id: string;
  memberIds: string[];
  name: string;
}

export interface Program {
  assistantCoachIds: string[];
  coachId: string;
  divisions: Division[];
  id: string;
  logoSrc: string;
  name: string;
}

export const getDivisionById = (divisionId: string, program: Program) =>
  R.find((division: Division) => divisionId === division.id, program.divisions);

export const getDivisionByName = (divisionName: string, program: Program) =>
  R.find(
    (division: Division) => divisionName === division.name,
    program.divisions,
  );

export const getProgramById = (programId: string, programs: Program[]) =>
  R.find((prog: Program) => programId === prog.id, programs);

export const parsePrograms = (programs: Program[]) =>
  Object.keys(programs).map((key: string) => {
    const program = programs[key];
    return {
      ...program,
      assistantCoachIds: JSON.parse(`${program.assistantCoachIds}`),
      divisions: R.values(program.divisions).map((division: Division) => ({
        ...division,
        classes: division.classes
          ? R.values(division.classes).map((classInst: ClassInst) => ({
              ...classInst,
              attendanceIds: JSON.parse(`${classInst.attendanceIds}`),
              date: {
                ...classInst.date,
                end: new Date(classInst.date.end),
                start: new Date(classInst.date.start),
              },
            }))
          : [],
        memberIds: division.memberIds ? JSON.parse(`${division.memberIds}`) : [],
      })),
    };
  });

export const isCoachOf = (memberId: string, program: Program) =>
  program.coachId === memberId ||
  R.contains(memberId, program.assistantCoachIds);
