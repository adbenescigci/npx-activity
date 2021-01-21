import { useEffect, useReducer } from 'react';
import { reducer, initial } from '../reducers/combineReducer';
import NotesContext from '../context/notes-context';
import AddNoteForm from './AddNoteForm';
import Search from './Search';
import NoteList from './NoteList';
import MyNotes from './MyNotes';
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
      <MyNotes/>
      <NoteList />
      <AddNoteForm />
      <h1>Notes</h1>
      <Search/>
    </NotesContext.Provider>
  )
}

export {NoteApp as default};

