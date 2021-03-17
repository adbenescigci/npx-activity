import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import NoteApp from './components/NoteApp';
import {history} from './routers/AppRouter';

import {firebase } from './firebase/firebase';
import 'firebase/auth';

let hasRendered = false;

const renderApp = ()=>{
  if(!hasRendered) {
      ReactDOM.render(
        <React.StrictMode>
          <NoteApp />
        </React.StrictMode>, document.getElementById('root'));
      hasRendered = true
}}

firebase.auth().onAuthStateChanged((user) => {
 
  if(user){
    renderApp()
    if (history.location.pathname.includes(`/myPage/${user.uid}`)) {
      history.push(history.location.pathname);
    } else history.push('/')  
  } 
  ////// pathname
  
  else {
    renderApp('')
    if (history.location.pathname === '/loginPage') {
      history.push('/loginPage');
    } else history.push('/');
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
