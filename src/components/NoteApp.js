import { useEffect, useReducer } from 'react';
import { reducer, initial } from '../reducers/combineReducer';
import NotesContext from '../context/notes-context';
import AppRouter from '../routers/AppRouter';
import init, {myInit} from '../actions/init';

import {firebase} from '../firebase/firebase';
import 'firebase/auth';

import '../styles/styles.scss';
import "react-datepicker/dist/react-datepicker.css";

const NoteApp = () => {

const [state, dispatch] = useReducer(reducer, initial)

async function ownStart (id) {
    const myItems = await myInit({id})
        if(myItems) {
            dispatch({type: 'POPULATE_MY_NOTES', myItems})
        }
}

async function start () {
  const notes = await init()
    if(notes) {
      dispatch({type: 'POPULATE_NOTES', notes})
    }
} 

console.log(state.private)
useEffect(()=>{
  firebase.auth().onAuthStateChanged((user) => {
    if(user){ 
      dispatch({type: 'SET_ID', uid:user.uid})
      ownStart(user.uid)  
    }
})
  start()
},[])

  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      <AppRouter/>
    </NotesContext.Provider>
  )
}

export { NoteApp as default };

