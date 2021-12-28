import { useContext } from 'react';
import NotesContext from '../context/notes-context';
import Header from './Header';
import NoteList from './Note/NoteList';
import MySelections from './MyPage/MySelections';

const DashBoard = () => {
  const { state } = useContext(NotesContext);

  return (
    <div>
      <Header />
      <div className="mainPage">
        <NoteList />
        {state.filters.uid !== '' && <MySelections />}
      </div>
    </div>
  );
};

export { DashBoard as default };
