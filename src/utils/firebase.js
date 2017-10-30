import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA5W9I2D3CDWbn96Pzxn2fRz6j3PrxUBbc",
    authDomain: "shindig-2d9ce.firebaseapp.com",
    databaseURL: "https://shindig-2d9ce.firebaseio.com",
    projectId: "shindig-2d9ce",
    storageBucket: "",
    messagingSenderId: "99824095833"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const googleSignIn = () => auth.signInWithPopup(googleProvider);

export const signOut = () => auth.signOut();

export default firebase;
