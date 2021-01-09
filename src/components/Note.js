import { useContext, useState } from 'react';
import { format,toDate } from 'date-fns'
import Form from './Form';
import NoteContext from '../context/notes-context';
import useMousePosition from '../hooks/useMousePosition';

import database from '../firebase/firebase';

const Note = ({note})=> {

  const {dispatch} = useContext(NoteContext);
  const [edit,setEdit] = useState(false)
  const position = useMousePosition();

  const onRemove = () => {
    database.ref(`notes/${note.key}`).remove()
      .then(()=>dispatch({type: 'REMOVE_NOTE', id: note.id}))
  }

  async function updateNote ({title,body,sDate,eDate,selected}) {

    await database.ref(`notes/${note.key}`).set({...note, title,body,sDate,eDate,selected})
    dispatch({type: 'EDIT_NOTE', note:{title,body,sDate,eDate,selected}, id: note.id})
    
    setEdit(false)
  }

  
  const info=(
    <div>
          <h3>Title: { note.title } </h3>
        
          {note.selected? <> {note.selected.map( el => <p key={el}>{` ${el[1]} adet ${el[0]}` }</p>  ) } </> : ''}
          <p> Body:{ note.body } </p> 
          {note.sDate? <p>StartDate: {format(toDate(note.sDate),'dd/MM/yyyy')}</p>: ''}
          {note.sDate? <p>EndDate: {format(toDate(note.eDate),'dd/MM/yyyy')}</p>: ''}
          <p> Position: {position.x} {position.y}</p>
        </div>
  )
    return (
      <div>
        {!edit ? info:
          <Form 
            data = {note} 
            onSubmitForm={(e) => updateNote(e)}
          /> 
        }
      {note.id.length > 3 ? 
        <>
        <button onClick={onRemove}>x</button>
        <button onClick={()=>setEdit(true)}>e</button> 
        </>
        : ''
      }
    </div>
    )
  }

  export {Note as default}