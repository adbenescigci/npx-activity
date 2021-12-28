import { useContext } from 'react';
import Form from '../Form';
import NoteContext from '../../context/notes-context';

const NoteEdit = ({ note, setEdit, updateNote }) => {
  const { dispatch } = useContext(NoteContext);

  return (
    <div>
      <button
        onClick={() => {
          setEdit();
          dispatch({ type: 'SET_NOTE', note: '' });
        }}
      >
        {' '}
        Back{' '}
      </button>
      <h3>Edit</h3>
      {note.selected.map((e) => {
        return <p key={note.key + e[1] + e[0]}> {e[1] + 'adet' + e[0]}</p>;
      })}
      <Form
        data={note}
        onSubmitForm={(e) => {
          updateNote(e);
          dispatch({ type: 'SET_NOTE', note: '' });
        }}
      />
    </div>
  );
};

export { NoteEdit as default };
