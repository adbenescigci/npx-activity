import { useEffect, useState, useReducer } from 'react';
import Modal from 'react-modal';
import { reducer, initial } from '../reducers/combineReducer';
import NotesContext from '../context/notes-context';
import AppRouter from '../routers/AppRouter';
import init, {myInit, deletedItems } from '../actions/init';

import database,{firebase} from '../firebase/firebase';
import 'firebase/auth';

import '../styles/styles.scss';
import "react-datepicker/dist/react-datepicker.css";

const NoteApp = () => {
console.log(deletedItems)
const [state, dispatch] = useReducer(reducer, initial)
const [modalIsOpen,setIsOpen] = useState (false)
const [userId, setUserId]= useState ('')
const [name, setName]= useState ('')

async function ownStart (id) {
    
     setUserId(id)
    database.ref().child('private/'+ id +'/personal').once('value', data =>{

      if (data.val() === null) setIsOpen(true)
       else  dispatch({type:'PRIVATE_NAME', name:data.val().name })
    })

    const myItems = await myInit({id})
    
    if(myItems) {
        dispatch({type: 'POPULATE_MY_NOTES', myItems})
    }
  
}

async function start () {
  
  console.log(state.notes,state.private)
  const notes = await init()
    if(notes) {
      dispatch({type: 'POPULATE_NOTES', notes})
    }
} 

useEffect(()=>{
  firebase.auth().onAuthStateChanged((user) => {
    if(user){ 
      dispatch({type: 'SET_ID', uid:user.uid})
      ownStart(user.uid)  
    }
})
  start()
},[])
 
const closeModal = () => setIsOpen(false);

const onSetUserName = ()=>{
  console.log(userId)
  database.ref().child('private/'+ userId +'/personal').set({name}).then(()=>{
    dispatch({type:'PRIVATE_NAME', name}) 
})
  closeModal()
}

  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      
      <Modal
        isOpen={modalIsOpen}
       // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        appElement={document.getElementById('root')}
      >
        <p> Lutfen Kullanici adi giriniz </p>
        <input 
            value={name}  
            placeholder='Kullanici adi giriniz'
            onChange={(e)=>setName(e.target.value)} 
            required
        />
        <button onClick={onSetUserName}> Ok</button>
      </Modal>

      <AppRouter/>
    </NotesContext.Provider>
  )
}

export { NoteApp as default };

