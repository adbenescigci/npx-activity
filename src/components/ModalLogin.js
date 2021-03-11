import Modal from 'react-modal';

const ModalLogin =({isLogged, setLogIn})=>

    <Modal 
      isOpen={isLogged}
      contentLabel="Select Modal"
      onRequestClose= {()=> setLogIn()}
      appElement={document.getElementById('root')}
    >
      <p>You are not logged in. Please Log In. </p>
      <button onClick ={ () => setLogIn()} > ok </button>
      
    </Modal>


export { ModalLogin  as default}