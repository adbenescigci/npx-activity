import { useContext } from 'react';
import Form from '../Form';
import { DispatchContext } from '../../context/notes-context';

const NoteEdit = ({ note, setEdit, updateNote }) => {
  const { dispatch_filters } = useContext(DispatchContext);

  return (
    <div>
      <button
        onClick={() => {
          setEdit();
          dispatch_filters({ type: 'SET_NOTE', note: '' });
        }}
      >
        Back
      </button>
      <h3>Edit</h3>
      {note.selected.map((e) => {
        return <p key={note.key + e[1] + e[0]}> {e[1] + 'adet' + e[0]}</p>;
      })}
      <Form
        data={note}
        onSubmitForm={(e) => {
          updateNote(e);
          dispatch_filters({ type: 'SET_NOTE', note: '' });
        }}
      />
    </div>
  );
};

export { NoteEdit as default };
