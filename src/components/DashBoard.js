import { memo, useEffect, useState } from 'react';
import Header from './Header';
import NoteList from './Note/NoteList';
import MySelections from './MyPage/MySelections';

const DashBoard = ({ id = '' }) => {
  const [className, setClassName] = useState('dashboard');

  useEffect(() => {
    if (id !== '') {
      setClassName('dashboard dashboard--withMySelections');
    } else setClassName('dashboard');

    return () => {
      setClassName('dashboard');
    };
  }, [id]);

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
