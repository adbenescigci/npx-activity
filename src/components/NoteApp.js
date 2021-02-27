import { useEffect, useReducer } from 'react';
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

async function ownStart (id) {

      database.ref().child('private/'+ id +'/personal').once('value', data =>{

        if(data.val()===null){
            database.ref().child('private/'+ id +'/personal').set({name:'merhaba'}).then(()=>{
                dispatch({type:'PRIVATE_NAME', name:'merhab' }) 
            })
        } else  dispatch({type:'PRIVATE_NAME', name:data.val().name })

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
 
  return (
    <NotesContext.Provider value = {{state, dispatch}}>
      <AppRouter/>
    </NotesContext.Provider>
  )
}

export { NoteApp as default };

