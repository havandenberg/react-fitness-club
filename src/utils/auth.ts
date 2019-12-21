import * as firebase from 'firebase';
import { Alert } from '../types/alert';
import { Program } from '../types/program';
import { ShopItem } from '../types/shop';
import { SpecialEvent } from '../types/special-event';

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

export const listenForInventoryChanges = (
  callback: (shopItems: ShopItem[]) => void,
) => {
  firebase
    .database()
    .ref(`inventory`)
    .on('value', snapshot => {
      if (snapshot) {
        callback(snapshot.val());
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
