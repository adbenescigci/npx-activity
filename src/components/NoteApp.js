import { useEffect, useReducer } from 'react';
import { reducer, initial } from '../reducers/combineReducer';
import NotesContext from '../context/notes-context';
import AppRouter, {history} from '../routers/AppRouter';
import init from '../actions/init';
import Header from './Header';

import {firebase} from '../firebase/firebase';
import 'firebase/auth';

import '../styles/styles.scss';
import "react-datepicker/dist/react-datepicker.css";

const NoteApp = () => {

const [state, dispatch] = useReducer(reducer, initial);

async function start () {
  const notes = await init()
    if(notes) {
      dispatch({type: 'POPULATE_NOTES', notes})
    }
} 

useEffect(()=>{
  console.log('noteApp')
  firebase.auth().onAuthStateChanged((user) => {
    if(user){ dispatch({type: 'SET_ID', uid:user.uid})}
})
  start()
},[])


  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      <Header/>
      <AppRouter/>
    </NotesContext.Provider>
  )
}

export { NoteApp as default };



