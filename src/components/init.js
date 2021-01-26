import database from '../firebase/firebase';

const initialNotes= () => database.ref('notes').once('value')
  
const commonNotes = () => database.ref('ortak').once('value')

const mySelections = () => database.ref('private/mySelections').once('value')


async function init() {
   
    const notesOrtak= [];
    const notesPersonal= [];
   
 
    const ortak = commonNotes().then((snapshot)=>{
        snapshot.forEach((child)=>{
        notesOrtak.push({...child.val(), key: child.key})
        })
        return notesOrtak
        }) ;
        
    const personal = initialNotes().then((snapshot)=>{
        snapshot.forEach((child)=>{
        notesPersonal.push({...child.val(), key: child.key})
        }) 
        return notesPersonal
    });

    const notes = [...await personal, ...await ortak] 
    return notes
} 

async function myInit() {

    const selectedItems = [];
    
    const mySelectedItems = mySelections().then((snapshot)=>{
        snapshot.forEach((child)=>{
        selectedItems.push({...child.val(), key: child.key})
        })
        return selectedItems
    });
    const myItems={items: [...await mySelectedItems]}
    return myItems
}

export {myInit, init as default }