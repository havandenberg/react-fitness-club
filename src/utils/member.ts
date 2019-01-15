import * as firebase from 'firebase';

export const getCurrentMemberRef = (userId: string) =>
  firebase.database().ref(`members/${userId}`);
