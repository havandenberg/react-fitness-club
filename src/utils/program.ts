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

// Division utils

export const enrollInDivision = (
  division: Division,
  programId: string,
  memberId: string,
) =>
  getDivisionRef(programId, division.id).update({
    memberIds: JSON.stringify(R.uniq(division.memberIds.concat(memberId))),
  });

export const getEnrolledDivision = (program: Program, memberId: string) =>
  program.divisions.find((div: Division) =>
    R.contains(memberId, div.memberIds),
  );

export const getDivisionRef = (programId: string, divisionId: string) =>
  firebase.database().ref(`programs/${programId}/divisions/${divisionId}`);

export const getDivisionById = (divisionId: string, program: Program) =>
  R.find((division: Division) => divisionId === division.id, program.divisions);

export const getDivisionByName = (divisionName: string, program: Program) =>
  R.find(
    (division: Division) => divisionName === division.name,
    program.divisions,
  );

export const getDivisionMonthlyCost = (
  program: Program,
  divisionId?: string,
) => {
  const division = divisionId && getDivisionById(divisionId, program);
  return division && division.monthlyCost
    ? division.monthlyCost
    : program.monthlyCost;
};

export const getDivisionDiscountMultiplier = (
  program: Program,
  divisionId?: string,
) => {
  const division = divisionId && getDivisionById(divisionId, program);
  return division && division.discountMultiplier
    ? division.discountMultiplier
    : program.discountMultiplier
    ? program.discountMultiplier
    : 0;
};

export const getDivisionDiscountCost = (
  program: Program,
  divisionId?: string,
) => {
  return (
    getDivisionMonthlyCost(program, divisionId) *
    (1 - getDivisionDiscountMultiplier(program, divisionId))
  );
};

export const getDivisionDiscountMonths = (
  program: Program,
  divisionId?: string,
) => {
  const division = divisionId && getDivisionById(divisionId, program);
  return division && division.discountMonths
    ? division.discountMonths
    : program.discountMonths
    ? program.discountMonths
    : 0;
};

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
