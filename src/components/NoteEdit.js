import { useContext} from 'react';
import Form from './Form';
import NoteContext from '../context/notes-context';

const NoteEdit =({note, setEdit, updateNote})=>{
    
  const {dispatch} = useContext(NoteContext);

  return <div>
            <button onClick={()=> {setEdit();dispatch({type: 'SET_NOTE', note:''})}}> Turn Back </button>
            <h3>Edit</h3>
            <Form
                data = {note}
                onSubmitForm={(e) => {updateNote(e); dispatch({type: 'SET_NOTE', note:''})}}
            />
         </div>
}

export { NoteEdit as default }