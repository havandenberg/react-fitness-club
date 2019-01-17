import * as firebase from 'firebase';
import * as R from 'ramda';
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

export const getEnrolledPrograms = (programs: Program[], memberId: string) =>
  programs.filter((prog: Program) =>
    R.reduce(
      (isEnrolled: boolean, div: Division) =>
        div.memberIds && (isEnrolled || R.contains(memberId, div.memberIds)),
      false,
      prog.divisions,
    ),
  );
