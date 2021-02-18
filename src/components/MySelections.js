import {useContext} from 'react';
import NotesContext from '../context/notes-context';
import database from '../firebase/firebase';
import init from '../actions/init';

const MySelections = () =>{

    const { state, dispatch } = useContext (NotesContext)
    const id = state.filters.uid
    const item = state.private.items

    async function start () {
        const notes = await init()
          if(notes) {
            dispatch({type: 'POPULATE_NOTES', notes})
          }
      } 

    async function removeMyItem (el) {
        const note = state.notes.filter(item=> item.key === el.noteKey)[0] 
        const update ={name:el.item, number:el.queryIndex+1, status:'unRead', userToken:''}

        const updates = {};
        updates['/notes/' + note.key + '/selected/' + el.index + '/2/' + el.queryIndex + '/' + el.indexSub] = update;
        updates['/private/' + id + '/mySelections/' + el.key] = []

        await database.ref().update(updates);
        dispatch({type: 'REMOVE_MY_NOTE', key:el.key})
        start()
    }
    
    async function editMyItem (el) {
        const note = state.notes.filter(item=> item.key === el.noteKey)[0]
        const update = {name:el.item, number:el.queryIndex+1, status:'completed', userToken:id}
    
        const editedItems=state.private.items.map( item =>{ 
            if (item.key === el.key){
                item = {...el, status:'completed'}
            } 
            return item
        })

        const updates = {};
        updates['/notes/' + note.key + '/selected/' + el.index + '/2/' + el.queryIndex + '/' + el.indexSub] = update;
        updates['/private/' + id + '/mySelections/' + el.key + '/status'] = 'completed';

        await database.ref().update(updates);
        dispatch({type: 'EDIT_MY_NOTE', editedItems})
        start()
    }

    return <div>
                <h3>My Selected Items</h3>
                {item[0] !==undefined ? item.map((el)=> 
                    <div key = {el.key}>
                        <div>
                            <h3> {el.name}-{el.item}</h3>
                            <h6 > {el.id} </h6> 
                            <h6> {el.noteKey} </h6>
                        </div> 
                        <button onClick={()=> removeMyItem(el)}>x</button>
                        <button onClick={()=> editMyItem(el)}>completed</button>
                    </div> ) : 'there is no item'
                }
            </div>
        }

  export { MySelections as default }      