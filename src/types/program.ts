import * as R from 'ramda';
import { Member } from './member';

export interface Program {
  id: string;
  coachId: string;
  assistantCoachIds: string[];
}

export const parsePrograms = (programs: Program[]) =>
  Object.keys(programs).map((key: string) => {
    const program = programs[key];
    if (program.assistantCoachIds.indexOf('[') !== -1) {
      return {
        ...program,
        assistantCoachIds: JSON.parse(`${program.assistantCoachIds}`),
      };
    }
    return program;
  });

export const isCoachOf = (
  user: Member,
  programId: string,
  programs: Program[],
) => {
  const program = programs.find((prog: Program) => prog.id === programId);
  if (program) {
    return (
      program.coachId === user.uid ||
      R.contains(user.uid, program.assistantCoachIds)
    );
  }
  return false;
};
