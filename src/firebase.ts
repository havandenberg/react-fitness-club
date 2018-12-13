import * as firebase from 'firebase';
import { newUserDefaults } from './types/user';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_DOMAIN}.firebaseapp.com`,
  databaseURL: `https://${
    process.env.REACT_APP_FIREBASE_DOMAIN
  }.firebaseio.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_DOMAIN,
  storageBucket: `${process.env.REACT_APP_FIREBASE_DOMAIN}.appspot.com`,
};
firebase.initializeApp(config);

export type AuthProvider = 'facebook' | 'google' | 'email';
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const getAuthProvider = (provider: AuthProvider) => {
  switch (provider) {
    case 'facebook':
      return facebookProvider;
    case 'google':
      return googleProvider;
    default:
      return null;
  }
};

export const auth = firebase.auth();

export const createNewUser = (user: firebase.User) => ({
  ...newUserDefaults,
  email: user.email || '',
  firstName: user.displayName || '',
  lastName: user.displayName || '',
});

export default firebase;
