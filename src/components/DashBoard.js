import { memo } from 'react';
import Header from './Header';
import NoteList from './Note/NoteList';
import MySelections from './MyPage/MySelections';

const DashBoard = ({ id }) => {
  const className = `dashboard${id !== '' ? '' : ' dashboard--withMySelections'}`;

  return (
    <>
      <Header />
      <div className={className}>
        <NoteList />
        {id !== '' && <MySelections id={id} className=" mySelections--withDashboard" />}
      </div>
    </>
  );
};

export default memo(DashBoard);
