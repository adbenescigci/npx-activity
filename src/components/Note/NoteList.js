import { useContext } from 'react';
import Note from './Note';
import { StateContext } from '../../context/notes-context';
import searchSelector from '../../selectors/notesSearch';
import Search from '../Search/Search';

const NoteList = () => {
  const { state_filters, state_notes } = useContext(StateContext);
  const { endDate, startDate, text, sortBy, activityType } = state_filters;

  return (
    <div>
      <Search />
      <div className="activity-container">
        {searchSelector(state_notes, {
          text,
          startDate,
          endDate,
          sortBy,
          activityType,
        }).map((note) => (
          <Note key={note.key} note={note} />
        ))}
      </div>
    </div>
  );
};

export { NoteList as default };
