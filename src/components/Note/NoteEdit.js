import { useContext } from 'react';
import Form from '../Form';
import { DispatchContext } from '../../context/notes-context';

const NoteEdit = ({ note, setEdit, updateNote }) => {
  const { dispatch_filters } = useContext(DispatchContext);

  return (
    <div>
      <Form
        data={note}
        onSubmitForm={(e) => {
          updateNote(e);
          dispatch_filters({ type: 'SET_NOTE', note: '' });
        }}
      />
      <button
        className="btn btn--redR"
        onClick={() => {
          setEdit();
          dispatch_filters({ type: 'SET_NOTE', note: '' });
        }}
      >
        Back
      </button>
    </div>
  );
};

export { NoteEdit as default };
