import {useContext, useEffect} from 'react';
import NotesContext from '../context/notes-context';
import {myInit} from './init';

import database from '../firebase/firebase';

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


async function removeMyItem (el) {
    const note = state.notes.filter(item=> item.id === el.id)[0]
    note.selected[el.index][2][el.queryIndex][el.indexSub] = {name:el.item, number:el.queryIndex+1, status:'unRead', userToken:''}
    
    await database.ref(`private/${el.key}`).remove()
    dispatch({type: 'REMOVE_MY_NOTE', id: el.id, item:el.item})

    await database.ref(`notes/${note.key}`).set(note)
    dispatch({type: 'EDIT_NOTE', note, id: el.id})
}

async function editMyItem (el) {
    const note = state.notes.filter(item=> item.id === el.id)[0]
    note.selected[el.index][2][el.queryIndex][el.indexSub] = {name:el.item, number:el.queryIndex+1, status:'completed', userToken:'123123'}

    await database.ref(`notes/${note.key}`).set(note)
    dispatch({type: 'EDIT_NOTE', note, id: el.id})
    
    await database.ref(`private/${el.key}`).set({id:el.id, item:el.item, status: 'completed', index: el.index, indexSub:el.indexSub, queryIndex:el.queryIndex})
    dispatch({type: 'EDIT_MY_NOTE', item: {...el, status:'completed'}, key: el.key})
    console.log('editMy Item',state.private.items,{...el, status: 'completed'})

    // await database.ref(`notes/${note.key}`).set({...note, title,body,sDate,eDate,selected})
    // dispatch({type: 'EDIT_NOTE', note:{title,body,sDate,eDate,selected}, id: note.id})
}

const item = state.private.items

    return (
        <div>
            <h3>My Items</h3>
            {item[0] !==undefined ? item.map((el)=> 
                <div key = {el.key}> 
                    <p > {el.id} - index: {el.index} - query:{el.queryIndex}- {el.item} </p>
                    <button onClick={()=> removeMyItem(el)}>x</button>
                    <button onClick={()=> editMyItem(el)}>completed</button>
                </div> ) :
            'there is no item'}
        </div>

)}

export {MyNotes as default}