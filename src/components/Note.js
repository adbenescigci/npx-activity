import { useContext, useState } from 'react';
import Info from './NoteInfo';
import NoteContext from '../context/notes-context';
import ModalLogin from './ModalLogin';
import ModalSelection from './ModalSelection';
import { history } from '../routers/AppRouter';

import database from '../firebase/firebase';

const Note = ({ note, place }) => {
  const { state, dispatch } = useContext(NoteContext);
  const [edit, setEdit] = useState(false);
  const [isLogged, setLogIn] = useState(false);
  const id = state.filters.uid;

  const onRemove = () => {
    database
      .ref(`notes/${note.key}`)
      .remove()
      .then(
        () => dispatch({ type: 'REMOVE_NOTE', key: note.key }),
        dispatch({ type: 'REMOVE_MY_NOTE_ALL', key: note.key })
      );
  };

  async function updateNote({ title, body, sDate, eDate, selected }) {
    await database.ref(`notes/${note.key}`).set({ id: note.id, title, body, sDate, eDate, selected });
    dispatch({
      type: 'EDIT_NOTE',
      note: { title, body, sDate, eDate, selected },
      key: note.key,
    });

    setEdit(false);
  }

  const onJoin = () => {
    if (id !== '') {
      dispatch({ type: 'SET_NOTE', note: note.key });
    } else setLogIn(true);
  };

  const onClickEdit = () => {
    setEdit(true);
    dispatch({ type: 'SET_NOTE', note: note.key });
  };

  const onManageNote = () => {
    console.log('manage', note);
    history.push(`${history.location.pathname}/Manage/${note.key}`);
  };

  return (
    <div>
      <button onClick={() => onJoin()}> Join </button>
      {place === 'private' && (
        <div>
          <button onClick={onRemove}> x </button>
          <button onClick={onClickEdit}> edit </button>
          <button onClick={onManageNote}> Manage </button>
        </div>
      )}

      <Info note={note} />
      <ModalLogin isLogged={isLogged} setLogIn={() => setLogIn(false)} />
      {state.filters.note === note.key && (
        <ModalSelection note={note} edit={edit} setEdit={() => setEdit(false)} updateNote={(e) => updateNote(e)} />
      )}
    </div>
  );
};

Note.defaultProps = {
  place: '',
};

export { Note as default };
