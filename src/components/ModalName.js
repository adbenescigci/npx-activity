import {useState, useContext, useEffect} from 'react';
import Modal from 'react-modal';
import NotesContext from '../context/notes-context';
import database from '../firebase/firebase';

const ModalName = ({open}) => {
  
    const [isOpen,setIsOpen] = useState (open)
    const [name, setName]= useState ('')
    const { state, dispatch } = useContext (NotesContext)

    const id = state.filters.uid

    useEffect ( () => { 
        setIsOpen(open)}, [open]
    )

    const onSetUserName = ()=>{
        console.log(id, ' test 2')
        database.ref().child('private/'+ id +'/personal').set({name}).then(()=>{
        dispatch({type:'PRIVATE_NAME', name}) 
    })
        closeModal()
    }
    
    const closeModal = () => {
        setIsOpen(false)
    };

    return (
        <Modal
            isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Private Name Modal"
            appElement={document.getElementById('root')}
            >
            <p> Lutfen Kullanici adi giriniz </p>
            <input 
                value={name}  
                placeholder='Kullanici adi giriniz'
                onChange={(e)=>setName(e.target.value)} 
                required
            />
            <button onClick={onSetUserName}> Ok</button>
        </Modal>
        )
        
}

export { ModalName as default}