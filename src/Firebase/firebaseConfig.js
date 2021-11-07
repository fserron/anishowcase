import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC552dW_b878o2tY8szXwbdQJ4WvOgtogI",
    authDomain: "anishowcase.firebaseapp.com",
    projectId: "anishowcase",
    storageBucket: "anishowcase.appspot.com",
    messagingSenderId: "440200761396",
    appId: "1:440200761396:web:9bedcbca2c6ad297aa7a61"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}