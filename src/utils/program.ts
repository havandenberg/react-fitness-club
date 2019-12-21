import * as firebase from 'firebase';
import * as R from 'ramda';
import { Division, Program } from '../types/program';

// Program util

export const getProgramRef = (programId: string) =>
  firebase.database().ref(`programs/${programId}`);

export const getProgramById = (programId: string, programs: Program[]) =>
  R.find((prog: Program) => programId === prog.id, programs);

// Division utils

export const getDivisionRef = (programId: string, divisionId: string) =>
  firebase.database().ref(`programs/${programId}/divisions/${divisionId}`);

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
      })),
    };
  });
