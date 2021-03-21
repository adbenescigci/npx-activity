import { useEffect, useState, useContext} from 'react';
import NotesContext from '../context/notes-context';
import database from '../firebase/firebase';

const MyArchive = () => {
    
    const { state, dispatch } = useContext (NotesContext)
    const [ items,setItems ]= useState([])
    const id = state.filters.uid

    useEffect( () => {
        setItems(state.private.archive)
    },[state.private.archive])

    const onRemoveArchiveItems = key => 
            database.ref('private/'+ id + '/myArchive/'+ key).remove()
                .then(() =>  dispatch({type: 'REMOVE_ARCHIVE_ITEM', key}))

    const onRemoveArchive = () =>{
            database.ref('private/'+ id + '/myArchive').remove()
                .then(() =>  dispatch({type: 'REMOVE_ARCHIVE'}))
    }
    return  <div>
                <h3>MyArchive</h3>
                {items !== undefined && 
                    (items.length !== 0 ? 
                        <button onClick = { onRemoveArchive }> DeleteAll </button> : 'Arsivinizde bir kayit bulunmamaktadir')
                } 
                <br></br>
                {items !== undefined && 
                    items.map( item => 
                        <div key = {item.key}>
                            <p > {item.name} - {item.item}</p>
                            <button onClick={ () => onRemoveArchiveItems(item.key)}> x </button>
                        </div>)
                }
                
            </div>
}

export {MyArchive as default}