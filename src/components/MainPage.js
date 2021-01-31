import {useContext} from 'react';
import NotesContext from '../context/notes-context';
import NoteList from './NoteList';
import MyNotes from './MyNotes';
import Header from './Header';


const MainPage=()=>{
    const { state } = useContext(NotesContext)
   
    return <div>
                <Header/>
                <NoteList/>
                {state.filters.id !== '' && <MyNotes/>}
            </div>
}

export { MainPage as default}