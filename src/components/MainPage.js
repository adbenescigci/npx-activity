import {useContext} from 'react';
import NotesContext from '../context/notes-context';
import NoteList from './NoteList';
import MyNotes from './MyNotes';


const MainPage=()=>{
    const { state } = useContext(NotesContext)
   
    return <div>
                <NoteList/>
                {state.filters.uid !== '' && <MyNotes/>}
            </div>
}

export { MainPage as default}