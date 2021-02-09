import {useContext, useEffect} from 'react';
import NotesContext from '../context/notes-context';
import {myInit} from '../actions/init';
import MyActivities from './MyActivities';
import MySelections from './MySelections';
import AddNoteForm from './AddNoteForm';
import Header from './Header';

const MyNotes = () =>{   
    const { state, dispatch } = useContext (NotesContext)
    const id = state.filters.uid

    async function ownStart () {
        const myItems = await myInit({id})
            if(myItems) {
                dispatch({type: 'POPULATE_MY_NOTES', myItems})
            }
    }

    useEffect(()=>{
        ownStart()
    },[])

    return <div>  
                <Header/>
                <MySelections/>
                <MyActivities/>
                <AddNoteForm />
            </div>
}

export {MyNotes as default}