import * as firebase from 'firebase';
import * as R from 'ramda';
import { ClassInst } from '../types/class';
import { Membership } from '../types/membership';
import { Division, Program } from '../types/program';

// Program utils

export const getProgramRef = (programId: string) =>
  firebase.database().ref(`programs/${programId}`);

export const getProgramById = (programId: string, programs: Program[]) =>
  R.find((prog: Program) => programId === prog.id, programs);

export const getMembershipProgram = (
  membership: Membership,
  programs: Program[],
) =>
  R.find((program: Program) => R.equals(program.id, membership.type), programs);

export const getCoachingPrograms = (programs: Program[], memberId: string) =>
  programs.filter((prog: Program) => isCoachOfProgram(memberId, prog));

export const getEnrolledPrograms = (programs: Program[], memberId: string) =>
  programs.filter((prog: Program) =>
    R.reduce(
      (isEnrolled: boolean, div: Division) =>
        div.memberIds && (isEnrolled || R.contains(memberId, div.memberIds)),
      false,
      prog.divisions,
    ),
  );

// Division utils

export const enrollInDivision = (
  division: Division,
  programId: string,
  memberId: string,
) =>
  getDivisionRef(programId, division.id).update({
    memberIds: JSON.stringify(R.uniq(division.memberIds.concat(memberId))),
  });

export const getEnrolledDivisions = (program: Program, memberId: string) =>
  program.divisions.filter((div: Division) =>
    R.contains(memberId, div.memberIds),
  );

export const getDivisionRef = (programId: string, divisionId: string) =>
  firebase.database().ref(`programs/${programId}/divisions/${divisionId}`);

export const getDivisionCost = (program: Program, divisionId?: string) => {
  const division = divisionId && getDivisionById(divisionId, program);
  return division ? division.cost || program.cost : program.cost;
};

export const getDivisionById = (divisionId: string, program: Program) =>
  R.find((division: Division) => divisionId === division.id, program.divisions);

export const getDivisionByName = (divisionName: string, program: Program) =>
  R.find(
    (division: Division) => divisionName === division.name,
    program.divisions,
  );

export const parsePrograms = (programs: Program[]) =>
  Object.keys(programs).map((key: string) => {
    const program = programs[key];
    return {
      ...program,
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
        memberIds: division.memberIds
          ? JSON.parse(`${division.memberIds}`)
          : [],
      })),
    };
  });

export const isCoachOfProgram = (memberId: string, program: Program) =>
  R.contains(memberId, program.coachIds);
