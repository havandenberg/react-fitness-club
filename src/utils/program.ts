import * as firebase from 'firebase';
import * as R from 'ramda';
import { ClassInst } from '../types/class';
import { Division, Program } from '../types/program';

export const enrollInDivision = (
  division: Division,
  programId: string,
  memberId: string,
) => {
  if (!R.contains(memberId, division.memberIds)) {
    getDivisionRef(programId, division.id).update({
      memberIds: JSON.stringify(division.memberIds.concat(memberId)),
    });
  }
};

export const getDivisionRef = (programId: string, divisionId: string) =>
  firebase.database().ref(`programs/${programId}/divisions/${divisionId}`);

export const getProgramRef = (programId: string) =>
  firebase.database().ref(`programs/${programId}`);

export const getCoachingPrograms = (programs: Program[], memberId: string) =>
  programs.filter((prog: Program) => isCoachOf(memberId, prog));

export const getEnrolledPrograms = (programs: Program[], memberId: string) =>
  programs.filter((prog: Program) =>
    R.reduce(
      (isEnrolled: boolean, div: Division) =>
        div.memberIds && (isEnrolled || R.contains(memberId, div.memberIds)),
      false,
      prog.divisions,
    ),
  );

export const getEnrolledDivision = (program: Program, memberId: string) =>
  program.divisions.find((div: Division) =>
    R.contains(memberId, div.memberIds),
  );

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
