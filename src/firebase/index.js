import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCdGAhDMhhdakUzq1mXj7boIUz5p-JHAGE',
  authDomain: 'netflix-clone-63c8e.firebaseapp.com',
  projectId: 'netflix-clone-63c8e',
  storageBucket: 'netflix-clone-63c8e.appspot.com',
  messagingSenderId: '668757685101',
  appId: '1:668757685101:web:4884e2afc1efcc35d7a064',
  measurementId: 'G-8HQ3CXJEC7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

window.firebase = firebase;

export const firestore = firebase.firestore();

export default firebase;
