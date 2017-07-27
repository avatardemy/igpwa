import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB4Sj2GRayeJMJNZei8Q-UD9J1DxAs_qFo',
  authDomain: 'igpwa-e54f7.firebaseapp.com',
  databaseURL: 'https://igpwa-e54f7.firebaseio.com',
  projectId: 'igpwa-e54f7',
  storageBucket: 'igpwa-e54f7.appspot.com',
  messagingSenderId: '676841046751',
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
