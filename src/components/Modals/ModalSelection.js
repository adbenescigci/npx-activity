import Modal from 'react-modal';
import NoteSelection from '../Note/NoteSelection';
import NoteEdit from '../Note/NoteEdit';

const ModalSelection = ({ note, edit, setEdit, updateNote }) => (
  <Modal isOpen={true} contentLabel="Select Modal" appElement={document.getElementById('root')}>
    <h2>Title: {note.title} </h2>

    {!edit ? (
      <NoteSelection note={note} />
    ) : (
      <NoteEdit note={note} setEdit={setEdit} updateNote={(e) => updateNote(e)} />
    )}
  </Modal>
);

export { ModalSelection as default };
