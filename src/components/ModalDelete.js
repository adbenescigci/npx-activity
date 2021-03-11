import {useState} from 'react';
import Modal from 'react-modal';

const ModalDelete = () => {
  
    const [isOpen,setIsOpen] = useState (true)
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={ () => setIsOpen(false) }
            contentLabel="Deleted Modal"
            appElement={document.getElementById('root')}
            >
            <p> Almis oldugunuz asagidaki okumalariniz organizatorun ilgili aktiviteyi kaldirmasi nedeniyle  iptal ediilmistir</p>
            <p> Listenizden dusurulmustur.</p>

            <button onClick = { ()=> setIsOpen(false)}> Tamam</button>

        </Modal>
        )      
}

export { ModalDelete as default}