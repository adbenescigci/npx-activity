import { useState, useContext, useEffect, memo } from 'react';

//Children
import ModalName from './Modals/ModalName';
import ModalDelete from './Modals/ModalDelete';
import AppRouter from '../routers/AppRouter';

//StartUp
import init, { myInit } from '../actions/init';

//Context
import { DispatchContext } from '../context/notes-context';

//DataBase
import database, { firebase } from '../firebase/firebase';
import 'firebase/auth';
import '../styles/styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

const NoteApp = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { dispatch_filters, dispatch_notes, dispatch_private } =
    useContext(DispatchContext);

  async function ownStart(id) {
    const myItems = await myInit({ id });
    database
      .ref()
      .child('private/' + id + '/personal')
      .once('value', (data) => {
        if (data.val() === null) setIsOpen(true);
        else {
          setIsOpen(false);
          dispatch_private({ type: 'PRIVATE_NAME', name: data.val().name });

          if (myItems) {
            dispatch_private({ type: 'POPULATE_MY_NOTES', myItems });
          }
        }
      });
  }

  async function start() {
    const notes = await init();
    if (notes) {
      dispatch_notes({ type: 'POPULATE_NOTES', notes });
    }
  }

  useEffect(() => {
    start();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch_filters({ type: 'SET_ID', uid: user.uid });
        ownStart(user.uid);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ModalDelete />
      {modalIsOpen && <ModalName onCloseModal={() => setIsOpen(false)} />}
      <AppRouter />
    </div>
  );
};

export default memo(NoteApp);
