import { useContext, useState, memo } from 'react';
import Info from './NoteInfo';
import { StateContext, DispatchContext } from '../../context/notes-context';
import ModalLogin from '../Modals/ModalLogin';
import ModalSelection from '../Modals/ModalSelection';
import { history } from '../../routers/AppRouter';

import database from '../../firebase/firebase';

const Note = ({ note, place = '' }) => {
  const { state_filters } = useContext(StateContext);
  const { dispatch_notes, dispatch_private, dispatch_filters } =
    useContext(DispatchContext);
  const [edit, setEdit] = useState(false);
  const [isLogged, setLogIn] = useState(false);
  const id = state_filters.uid;

  const onRemove = async function () {
    await database
      .ref(`notes/${note.key}`)
      .remove()
      .then(() => {
        dispatch_notes({ type: 'REMOVE_NOTE', key: note.key });
        dispatch_private({ type: 'REMOVE_MY_NOTE_ALL', key: note.key });
      });
  };

  const updateNote = async function ({ title, body, sDate, eDate, selected }) {
    await database
      .ref(`notes/${note.key}`)
      .set({ id: note.id, title, body, sDate, eDate, selected });
    dispatch_notes({
      type: 'EDIT_NOTE',
      note: { title, body, sDate, eDate, selected },
      key: note.key,
    });

    setEdit(false);
  };

  const onJoin = () => {
    if (id !== '') {
      dispatch_filters({ type: 'SET_NOTE', note: note.key });
    } else setLogIn(true);
  };

  const onClickEdit = () => {
    setEdit(true);
    dispatch_filters({ type: 'SET_NOTE', note: note.key });
  };

  const onManageNote = () => {
    history.push(`${history.location.pathname}/${note.key}/Manage`);
  };

  return (
    <div className="activity">
      {place === 'private' && (
        <div className="activity__header">
          <div>
            <button onClick={onClickEdit}>edit</button>
            <button onClick={onManageNote}> Manage </button>
          </div>
          <button className="btn btn--redR btn--small" onClick={onRemove}>
            remove
          </button>
        </div>
      )}
      <div className="activity__details">
        <Info note={note} />
        <ModalLogin isLogged={isLogged} setLogIn={() => setLogIn(false)} />
        {state_filters.note === note.key && (
          <ModalSelection
            note={note}
            edit={edit}
            setEdit={() => setEdit(false)}
            updateNote={(e) => updateNote(e)}
          />
        )}
      </div>
      <button onClick={onJoin}> Join </button>
    </div>
  );
};

export default memo(Note);
