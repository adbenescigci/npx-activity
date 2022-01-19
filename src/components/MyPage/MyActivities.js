import { useContext } from 'react';
import Note from '../Note/Note';
import NotesContext from '../../context/notes-context';
import myActionsSelector from '../../selectors/myActionsSelector';

const MyActivities = () => {
  const { state } = useContext(NotesContext);
  const id = state.filters.uid;
  const notes = state.notes;

  return (
    <div className="myRouter-container">
      <h2>My Activities</h2>
      {myActionsSelector(notes, { id }).map((note) => (
        <Note key={note.key} note={note} place={'private'} />
      ))}
    </div>
  );
};

export { MyActivities as default };
