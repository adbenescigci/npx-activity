import { useEffect, useReducer } from 'react';
import { reducer, initial } from '../reducers/combineReducer';
import NotesContext from '../context/notes-context';
import AddNoteForm from './AddNoteForm';
import Search from './Search';
import NoteList from './NoteList';
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
  start()
},[])

  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      <AddNoteForm />
      <h1>Notes</h1>
      <Search/>
      <NoteList />
    </NotesContext.Provider>
  )
}

export {NoteApp as default};

