import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBGRN-N_vn0FipywHTvb0uKlzPhc6qctr4",
    authDomain: "counter-v-4f6a5.firebaseapp.com",
    databaseURL: "https://counter-v-4f6a5.firebaseio.com",
    projectId: "counter-v-4f6a5",
    storageBucket: "counter-v-4f6a5.appspot.com",
    messagingSenderId: "240953017128",
    appId: "1:240953017128:web:77edea4a552ce4fc22861d",
    measurementId: "G-ZT4CGPV55G"
  };


  
firebase.initializeApp(firebaseConfig);

const database= firebase.database();

const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export {firebase , googleAuthProvider, database as default}