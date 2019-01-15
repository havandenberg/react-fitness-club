import * as firebase from 'firebase';
import * as R from 'ramda';
import { Member } from '../types/member';
import { Program } from '../types/program';

export const enrollInProgram = (program: Program, user: Member) => {
  if (!R.contains(user.uid, program.members)) {
    getProgramRef(program).update({
      members: JSON.stringify(program.members.concat(user.uid)),
    });
  }
};

export const getProgramRef = (program: Program) =>
  firebase.database().ref(`programs/${program.id}`);
