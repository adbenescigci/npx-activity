import {useContext} from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';
import myActionsSelector from '../selectors/myActionsSelector';


const MyActivities = () =>{

    const { state } = useContext(NotesContext)
    const id = state.filters.uid;
    const notes= state.notes;

    return myActionsSelector(notes,{id}) 
                .map((note) =>(
                        <Note key={note.key} note={note} place={'private'}/>
                       ))
}

export {MyActivities as default}