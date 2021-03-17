import { useEffect, useState, useContext} from 'react';
import { archivedItems } from '../actions/init';
import NotesContext from '../context/notes-context';

const MyArchive = () => {
    
    const { state } = useContext (NotesContext)
    const [items,setItems]= useState([])

    useEffect(()=>{
        setItems(state.private.archive)
    },[archivedItems[0]])

    return (
        <div>
            <h3>MyArchive</h3>
            {items !== undefined && items.map(item => <p key = {item.key}> {item.name} - {item.item}</p>)}
        </div>
    )
}

export {MyArchive as default}