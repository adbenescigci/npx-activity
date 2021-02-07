import {firebase, googleAuthProvider } from '../firebase/firebase';
import 'firebase/auth';

const startLogOut = () => firebase.auth().signOut()

const startLogin = () =>  firebase.auth().signInWithPopup(googleAuthProvider)

export {startLogOut, startLogin}