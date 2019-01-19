import * as firebase from 'firebase';
import * as R from 'ramda';
import { Member } from '../types/member';

export const getCurrentMemberRef = (memberId: string) =>
  firebase.database().ref(`members/${memberId}`);

export const parseMemberData = (member: Member) => ({
  ...member,
});

export const getMemberById = (memberId: string, members: Member[]) =>
  R.find((mem: Member) => memberId === mem.uid, members);
