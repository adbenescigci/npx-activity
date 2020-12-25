import {useContext} from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';
import searchSelector from '../selectors/notesSearch';


const NoteList = () =>{

    const { state } = useContext(NotesContext)
    const endDate = state.filters.endDate;
    const startDate = state.filters.startDate;
    const text = state.filters.text;
    const sortBy = state.filters.sortBy;
    const notes= state.notes;

    return searchSelector(notes,{text,startDate,endDate,sortBy})
                      .map((note)=>(
                        <Note key={note.key} note={note} />
                       ))
}

export {NoteList as default}

// state.notes.filter((note)=>{
//   return note.title.includes(text) && 
//   (!endDate || endDate >= note.eDate) && 
//   (!startDate || note.sDate >= startDate)
// })