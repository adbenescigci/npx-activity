import {useContext, useEffect} from 'react';
import NotesContext from '../context/notes-context';
import {myInit} from './init';

const MyNotes = () =>{   
const { state, dispatch } = useContext (NotesContext)

async function ownStart () {
    const myItems = await myInit()
        if(myItems) {
            dispatch({type: 'POPULATE_MY_NOTES', myItems})
        }
}
useEffect(()=>{
 ownStart()
},[])

const removeMyItem = (el) =>{
    const note = state.notes.filter(item=> item.id === el.id)[0]
    note.selected[el.index][2][el.queryIndex][el.indexSub] = {name:el.item, number:el.queryIndex+1, status:'unRead', userToken:''}
    
    dispatch({type: 'EDIT_NOTE', note, id: el.id})
    console.log('remove my item',el,note)
}
const item = state.private.items
    return (
        <div>
            <h3>My Items</h3>
            {item[0] !==undefined ? item.map((el)=> 
                <div key = {el.item+el.id}> 
                    <p > {el.id} - index: {el.index} - query:{el.queryIndex}- {el.item} </p>
                    <button onClick={()=> removeMyItem(el)}>x</button>
                    <button>completed</button>
                </div> ) :
            'there is no item'}
        </div>

)}

export {MyNotes as default}