import database from '../firebase/firebase';

const initialNotes= () => {
    return database.ref('notes').once('value')
  }
  
const commonNotes = () => {
return database.ref('ortak').once('value')
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

export { init as default }