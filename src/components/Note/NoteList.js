import { useContext } from 'react';
import Note from './Note';
import NotesContext from '../../context/notes-context';
import searchSelector from '../../selectors/notesSearch';
import Search from '../Search/Search';

const NoteList = () => {
  const { state } = useContext(NotesContext);
  const endDate = state.filters.endDate;
  const startDate = state.filters.startDate;
  const text = state.filters.text;
  const sortBy = state.filters.sortBy;
  const activityType = state.filters.activityType;

  return (
    <div>
      <Search />
      <div className="card-container">
        {searchSelector(state.notes, { text, startDate, endDate, sortBy, activityType }).map((note) => (
          <Note key={note.key} note={note} />
        ))}
      </div>
    </div>
  );
};

export { NoteList as default };
