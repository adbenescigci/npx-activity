import {useContext} from 'react';
import Form from './Form';
import NotesContext from '../context/notes-context';

import database from '../firebase/firebase';

const AddNoteForm = ()=>{
  
const {state,dispatch} = useContext(NotesContext);
const id = state.filters.uid;
async function addNote ({title,body,sDate,eDate,selected}) {

  await database.ref('notes').push({title, body, id, sDate, eDate, selected }).then((ref)=>{
      dispatch({
        type: 'ADD_NOTE',
        title, 
        body,
        id,
        key: ref.key,
        sDate,
        eDate,
        selected
      })
    })
}
   return <>
            <h2>Add NOTE</h2>
            <Form onSubmitForm={(e)=>addNote(e)}/>
          </>
}

export { AddNoteForm as default}