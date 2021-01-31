import { useEffect, useReducer } from 'react';
import { reducer, initial } from '../reducers/combineReducer';
import NotesContext from '../context/notes-context';
import AppRouter from '../routers/AppRouter';
import init from './init';

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
  console.log(state)
  start()
},[])


  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      <AppRouter/>
    </NotesContext.Provider>
  )
}

export { NoteApp as default };



