import Modal from 'react-modal';
import { history } from '../../routers/AppRouter';
import style from '../../utils/modalStyle';

const ModalLogin = ({ isLogged, setLogIn }) => (
  <Modal
    isOpen={isLogged}
    contentLabel="Select Modal"
    onRequestClose={() => setLogIn()}
    style={style}
    className="modal"
    appElement={document.getElementById('root')}
  >
    <p>You are not logged in. Please Log In. </p>
    <button className="btn btn--redR btn--big" onClick={() => setLogIn()}>
      Back
    </button>
    <button className="btn btn--big" onClick={() => history.push('/loginPage')}>
      Login
    </button>
  </Modal>
);

export { ModalLogin as default };
