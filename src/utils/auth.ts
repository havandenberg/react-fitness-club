import * as firebase from 'firebase';
import { auth, AuthProvider, getAuthProvider } from '../firebase';
import { Alert } from '../types/alert';
import { Member, newMemberDefaults } from '../types/member';
import { Program } from '../types/program';
import { SpecialEvent } from '../types/special-event';

export const checkAuthed = (
  subscribe: (data: object) => void,
  authedCallback: (member: Member) => void,
  unauthedCallback: () => void,
) => {
  const membersRef = firebase.database().ref('members');
  auth.onAuthStateChanged(member => {
    if (member) {
      membersRef.child(member.uid).once('value', snapshot => {
        if (snapshot.exists()) {
          authedCallback(snapshot.val());
        } else {
          const newMember = {
            ...newMemberDefaults,
            email: member.email || '',
            firstName: member.displayName
              ? member.displayName.split(' ')[0]
              : '',
            lastName: member.displayName
              ? member.displayName.split(' ')[1]
              : '',
            membership: {
              ...newMemberDefaults.membership,
              inactivePeriods: JSON.stringify(
                newMemberDefaults.membership.inactivePeriods,
              ),
            },
            pastMemberships: JSON.stringify(newMemberDefaults.pastMemberships),
            profilePhotoUrl: member.photoURL || '',
            uid: member.uid,
          };
          firebase
            .database()
            .ref(`members/${member.uid}`)
            .set(newMember, () => {
              firebase
                .database()
                .ref(`membersList`)
                .once('value', snap => {
                  const membersList = JSON.parse(snap.val());
                  firebase
                    .database()
                    .ref()
                    .update({
                      membersList: JSON.stringify(
                        membersList.concat([member.uid]),
                      ),
                    });
                });
            });
          subscribe(mailchimpUser(member.displayName, member.email));
        }
      });
    } else {
      unauthedCallback();
    }
  });
};

export const listenForAlertsChanges = (callback: (alerts: Alert[]) => void) => {
  firebase
    .database()
    .ref(`alerts`)
    .on('value', snapshot => {
      if (snapshot) {
        callback(snapshot.val());
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

export const listenForMemberChanges = (
  uid: string,
  callback: (member?: Member) => void,
) => {
  firebase
    .database()
    .ref(`members/${uid}`)
    .on('value', snapshot => {
      if (snapshot) {
        callback(snapshot.val());
      } else {
        callback();
      }
    });
};

export const listenForSpecialEventsChanges = (
  callback: (specialEvents: SpecialEvent[]) => void,
) => {
  firebase
    .database()
    .ref(`specialEvents`)
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
    .then((memberData: firebase.auth.UserCredential) => {
      if (memberData.user) {
        firebase
          .database()
          .ref(`members/${memberData.user.uid}`)
          .set(
            {
              ...newMemberDefaults,
              email,
              firstName,
              lastName,
              membership: {
                ...newMemberDefaults.membership,
                inactivePeriods: JSON.stringify(
                  newMemberDefaults.membership.inactivePeriods,
                ),
              },
              pastMemberships: JSON.stringify(
                newMemberDefaults.pastMemberships,
              ),
              uid: memberData.user.uid,
            },
            () => {
              firebase
                .database()
                .ref(`membersList`)
                .once('value', snap => {
                  const membersList = JSON.parse(snap.val());
                  if (memberData.user) {
                    firebase
                      .database()
                      .ref()
                      .update({
                        membersList: JSON.stringify(
                          membersList.concat([memberData.user.uid]),
                        ),
                      });
                  }
                });
            },
          );
      }
      subscribe({
        EMAIL: email,
        FNAME: firstName,
        LNAME: lastName,
        SOURCE: 'web-portal-form',
      });
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
