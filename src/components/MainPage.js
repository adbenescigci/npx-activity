import {useContext} from 'react';
import NotesContext from '../context/notes-context';
import Header from './Header';
import NoteList from './NoteList';
import MySelections from './MySelections';


const MainPage=()=>{
    const { state } = useContext(NotesContext)
   
    return <div>         
                <Header/>
                <div className='mainPage'>
                    <NoteList/>
                    {state.filters.uid !== '' && <MySelections/>}
                </div>
           </div>
}

export { MainPage as default}