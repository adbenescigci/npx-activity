import database from '../firebase/firebase';

const initialNotes= () => database.ref('notes').once('value')
const mySelections = (id) => database.ref(`private/${id}/mySelections`).once('value');
const singleNote = (key) => database.ref('notes/' + key ).once('value');

let noteKeys = [];
const updates = {};
const deletedItems = [] ;

async function singleInit(key) {
    return await singleNote(key)
                .then(snapshot => snapshot.val())
}

async function init() {
    noteKeys = []
    const notesPersonal= [];
    
    const personal = initialNotes().then((snapshot)=>{
        snapshot.forEach((child)=>{    
        noteKeys.push(child.key)
        notesPersonal.push({...child.val(), key: child.key})
        }) 
        return notesPersonal
    });

    const notes = [...await personal] 
    return notes
} 

async function myInit({id}) {
    
    const selectedItems = [];
    const mySelectedItems = mySelections(id).then((snapshot)=>{

        snapshot.forEach((child)=>{
            if(noteKeys.includes(child.val().noteKey)) {
                selectedItems.push({...child.val(), key: child.key}
            )}  else {
                    updates['private/'+ id + '/mySelections/' + child.key] = []; 
                    deletedItems.push(child.val()) 
                }   
         })
            database.ref().update(updates) 
        return selectedItems
    });

    const myItems={items: [...await mySelectedItems]}
    return myItems
}

export { myInit, singleInit, deletedItems, init as default }