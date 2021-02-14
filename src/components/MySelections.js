import {useContext} from 'react';
import NotesContext from '../context/notes-context';
import database from '../firebase/firebase';

const MySelections = () =>{

    const { state, dispatch } = useContext (NotesContext)
    const id = state.filters.uid
    const item = state.private.items

    async function removeMyItem (el) {
        const note = state.notes.filter(item=> item.key === el.noteKey)[0]
        note.selected[el.index][2][el.queryIndex][el.indexSub] = {name:el.item, number:el.queryIndex+1, status:'unRead', userToken:''}
        
        await database.ref(`private/${id}/mySelections/${el.key}`).remove()
        dispatch({type: 'REMOVE_MY_NOTE', key:el.key})
    
        await database.ref(`notes/${note.key}`).set(note)
        dispatch({type: 'EDIT_NOTE', note, id: el.id})
    }
    
    async function editMyItem (el) {
        const note = state.notes.filter(item=> item.key === el.noteKey)[0]
        note.selected[el.index][2][el.queryIndex][el.indexSub] = {name:el.item, number:el.queryIndex+1, status:'completed', userToken:id}
    
        const editedItems=state.private.items.map( item =>{ 
            if (item.key === el.key){
                item = {...el, status:'completed'}
            } 
            return item
        })
    
        await database.ref(`notes/${note.key}`).set(note)
        dispatch({type: 'EDIT_NOTE', note, key: el.noteKey})
        
        await database.ref(`private/${id}/mySelections/${el.key}`).set({id:el.id, item:el.item, status: 'completed', index: el.index, indexSub:el.indexSub, queryIndex:el.queryIndex})
        dispatch({type: 'EDIT_MY_NOTE', editedItems})
    }

    return <div>
                <h3>My Selected Items</h3>
                {item[0] !==undefined ? item.map((el)=> 
                    <div key = {el.key}>
                        <div>
                            <h3> {el.name}-{el.item}</h3>
                            <h6 > {el.id} </h6>
                        </div> 
                        <button onClick={()=> removeMyItem(el)}>x</button>
                        <button onClick={()=> editMyItem(el)}>completed</button>
                    </div> ) : 'there is no item'
                }
            </div>
        }

  export { MySelections as default }      