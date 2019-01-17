import * as firebase from 'firebase';

export const getCurrentMemberRef = (memberId: string) =>
  firebase.database().ref(`members/${memberId}`);
