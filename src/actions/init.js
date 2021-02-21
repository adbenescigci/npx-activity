import database from '../firebase/firebase';

const initialNotes= () => database.ref('notes').once('value')
const commonNotes = () => database.ref('ortak').once('value')
const mySelections = (id) => database.ref(`private/${id}/mySelections`).once('value');
const singleNote = (key) => database.ref('notes/' + key ).once('value');

async function singleInit(key) {
    return await singleNote(key)
                .then(snapshot => snapshot.val())
}

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

async function myInit({id}) {
    
    const selectedItems = [];
    
    const mySelectedItems = mySelections(id).then((snapshot)=>{
        snapshot.forEach((child)=>{
        selectedItems.push({...child.val(), key: child.key})
        })
        console.log(selectedItems,id)
        return selectedItems
    });
    const myItems={items: [...await mySelectedItems]}
    return myItems
}

export {myInit, singleInit, init as default }