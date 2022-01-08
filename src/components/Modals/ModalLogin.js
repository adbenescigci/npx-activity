import Modal from 'react-modal';
import { history } from '../../routers/AppRouter';

const ModalLogin = ({ isLogged, setLogIn }) => (
  <Modal
    isOpen={isLogged}
    contentLabel="Select Modal"
    onRequestClose={() => setLogIn()}
    appElement={document.getElementById('root')}
  >
    <p>You are not logged in. Please Log In. </p>
    <button onClick={() => setLogIn()}> Back </button>
    <button onClick={() => history.push('/loginPage')}> Login</button>
  </Modal>
);

export { ModalLogin as default };
