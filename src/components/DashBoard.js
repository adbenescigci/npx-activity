import { useContext } from 'react';
import NotesContext from '../context/notes-context';
import Header from './Header';
import NoteList from './Note/NoteList';
import MySelections from './MyPage/MySelections';

const DashBoard = () => {
  const { state } = useContext(NotesContext);
  const className = `dashboard${state.filters.uid !== '' ? '' : ' dashboard--withMySelections'}`;

  return (
    <>
      <Header />
      <div className={className}>
        <NoteList />
        {state.filters.uid !== '' && <MySelections className=" mySelections--withDashboard" />}
      </div>
    </>
  );
};

export { DashBoard as default };
