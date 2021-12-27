import { useContext } from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';
import searchSelector from '../selectors/notesSearch';
import Search from './Search';

const NoteList = () => {
  const { state } = useContext(NotesContext);
  const endDate = state.filters.endDate;
  const startDate = state.filters.startDate;
  const text = state.filters.text;
  const sortBy = state.filters.sortBy;

  return (
    <div>
      <Search />
      <h1>Notes</h1>
      {searchSelector(state.notes, { text, startDate, endDate, sortBy }).map((note) => (
        <Note key={note.key} note={note} />
      ))}
    </div>
  );
};

export { NoteList as default };
