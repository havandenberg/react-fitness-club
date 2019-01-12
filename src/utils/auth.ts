import * as firebase from 'firebase';
import { auth, AuthProvider, getAuthProvider } from '../firebase';
import { Member, newMemberDefaults } from '../types/member';
import { Program } from '../types/program';

export const checkAuthed = (
  subscribe: (data: object) => void,
  authedCallback: (user: Member) => void,
  unauthedCallback: () => void,
) => {
  const membersRef = firebase.database().ref('members');
  auth.onAuthStateChanged(user => {
    if (user) {
      membersRef.child(user.uid).once('value', snapshot => {
        if (snapshot.exists()) {
          authedCallback(snapshot.val());
        } else {
          const newUser = {
            ...newMemberDefaults,
            email: user.email || '',
            firstName: user.displayName ? user.displayName.split(' ')[0] : '',
            lastName: user.displayName ? user.displayName.split(' ')[1] : '',
            profilePhotoUrl: user.photoURL || '',
            uid: user.uid,
          };
          firebase
            .database()
            .ref(`members/${user.uid}`)
            .set(newUser, () => {
              authedCallback(newUser);
            });
          subscribe(mailchimpUser(user.displayName, user.email));
        }
      });
    } else {
      unauthedCallback();
    }
  });
};

export const listenForProgramChanges = (
  callback: (programs: Program[]) => void,
) => {
  firebase
    .database()
    .ref(`programs`)
    .on('value', snapshot => {
      if (snapshot) {
        callback(snapshot.val());
      }
    });
};

export const listenForUserChanges = (
  uid: string,
  callback: (user: Member) => void,
) => {
  firebase
    .database()
    .ref(`members/${uid}`)
    .on('value', snapshot => {
      if (snapshot) {
        callback(snapshot.val());
      }
    });
};

export const logout = () => {
  auth.signOut();
};

export const login = (
  provider: AuthProvider,
  email?: string,
  password?: string,
) => {
  const authProvider = getAuthProvider(provider);

  if (provider !== 'email' && authProvider) {
    auth.signInWithPopup(authProvider);
  } else if (email && password) {
    auth.signInWithEmailAndPassword(email, password);
  }
};

export const signup = (
  subscribe: (data: object) => void,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  onFail: (error: Error, msg?: string) => void,
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userData: firebase.auth.UserCredential) => {
      if (userData.user) {
        firebase
          .database()
          .ref(`members/${userData.user.uid}`)
          .set({
            ...newMemberDefaults,
            email,
            firstName,
            lastName,
            uid: userData.user.uid,
          });
        subscribe({
          EMAIL: email,
          FNAME: firstName,
          LNAME: lastName,
          SOURCE: 'web-portal-form',
        });
      }
    })
    .catch((error: Error) => {
      onFail(error, error.message);
    });
};

const mailchimpUser = (
  displayName: string | null,
  emailAddress: string | null,
) => ({
  EMAIL: emailAddress,
  FNAME: displayName && displayName.split(' ')[0],
  LNAME: displayName && displayName.split(' ')[1],
  SOURCE: 'web-portal-form',
});