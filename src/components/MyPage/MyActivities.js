import { useContext } from 'react';
import Note from '../Note/Note';
import { StateContext } from '../../context/notes-context';
import myActionsSelector from '../../selectors/myActionsSelector';

const MyActivities = () => {
  const { state_filters, state_notes } = useContext(StateContext);
  const id = state_filters.uid;
  const notes = state_notes;

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
