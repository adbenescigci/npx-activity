import MyActivities from './MyActivities';
import MySelections from './MySelections';
import AddNoteForm from './AddNoteForm';
import Header from './Header';

const MyNotes = () =>{   
    

    return <div>  
                <Header/>
                <MySelections/>
                <MyActivities/>
                <AddNoteForm />
            </div>
}

export {MyNotes as default}