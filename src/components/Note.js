import { useContext, useState } from 'react';
import Modal from 'react-modal';
import NoteSelection from './NoteSelection';
import Info from './NoteInfo';
import Form from './Form';
import NoteContext from '../context/notes-context';

import database from '../firebase/firebase';

const Note = ({note, place})=> {

  const {state,dispatch} = useContext(NoteContext);
  const [edit,setEdit] = useState(false)
  const [isLogged,setLogIn]= useState(false)
  
  const id = state.filters.uid;
  const flag = state.filters.note === '' 

 const onRemove = () => {
    database.ref(`notes/${note.key}`).remove()
      .then(() => 
        dispatch({type: 'REMOVE_NOTE', key: note.key}),
        dispatch({type: 'REMOVE_MY_NOTE_ALL', key: note.key}) 
      )
  }

  async function updateNote ({title,body,sDate,eDate,selected}) {

    await database.ref(`notes/${note.key}`).set({id:note.id, title,body,sDate,eDate,selected})
    dispatch({type: 'EDIT_NOTE', note:{title,body,sDate,eDate,selected}, key: note.key})

    setEdit(false)
  }


  const onJoin = ()=>{
        if(id !==''){
        dispatch({type:'SET_NOTE', note})
    } else setLogIn(true)
  }

    return (
      <div>
        {note.id.length !==3 &&
          <div>
            <button onClick={()=>onJoin()}> Join </button>
            <Modal 
            isOpen={isLogged}
            contentLabel="Select Modal"
            onRequestClose= {()=> setLogIn(false)}
            appElement={document.getElementById('root')}
            >
              <p>You are not logged in. Please Log In. </p>
              <button onClick ={ () => setLogIn(false)} > ok </button>
            </Modal>
        
            {(place==='private') && <button onClick={()=> onRemove()}> x </button>}
            {(place==='private') && <button onClick={()=> {setEdit(true); 
              dispatch({type:'SET_NOTE', note})}}> edit </button>}
          </div>
        }
        
         { flag && <Info note={note}/> }
            
            <Modal 
            isOpen={!flag}
            contentLabel="Select Modal"
            appElement={document.getElementById('root')}
            >
              <h2>Title: { note.title } </h2>

              {!edit ? 
                <NoteSelection note = {note}/> 
                :
                <div>
                  <button onClick={()=> {setEdit(false);dispatch({type: 'SET_NOTE', note:''})}}> Turn Back </button>
                  <h3>Edit</h3>
                  <Form
                    data = {note}
                    onSubmitForm={(e) => {updateNote(e); dispatch({type: 'SET_NOTE', note:''})}}
                  />
                </div>
              }
            </Modal>    
      </div>
      )
  }

 Note.defaultProps = {
    place: ''
 }

  export {Note as default}



