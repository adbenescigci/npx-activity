import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAIxafPXm9qXc4tEHSDQiqtpgouxogsgVM",
    authDomain: "note-app-react-32dcd.firebaseapp.com",
    databaseURL: "https://note-app-react-32dcd.firebaseio.com",
    projectId: "note-app-react-32dcd",
    storageBucket: "note-app-react-32dcd.appspot.com",
    messagingSenderId: "590684718522",
    appId: "1:590684718522:web:f4766ec5df6ab33124c983",
    measurementId: "G-BBJFVXHSG6"
  };


  
firebase.initializeApp(firebaseConfig);

const database= firebase.database();

export {firebase , database as default}