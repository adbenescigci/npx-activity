import Modal from 'react-modal';
import NoteSelection from './NoteSelection';
import NoteEdit from './NoteEdit';

const ModalSelection =({note, flag, edit, setEdit, updateNote}) =>
    <Modal 
        isOpen={!flag}
        contentLabel="Select Modal"
        appElement={document.getElementById('root')}
    >
        <h2>Title: { note.title } </h2>

        {!edit ? 
        <NoteSelection note = {note}/> 
        :
        <NoteEdit 
        note={note} 
        setEdit={()=>setEdit(false)}
        updateNote = {(e)=>updateNote(e)}
        />  
        }
        
    </Modal>   

export { ModalSelection  as default }