import { useState, useContext, useEffect } from 'react';
import ItemOption from './ItemOption';
import { DispatchContext } from '../../../context/notes-context';

const Item = ({ select, name, length }) => {
  const { dispatch_private } = useContext(DispatchContext);
  const [reverse, setReverse] = useState(length === 1 ? true : false);

  useEffect(() => {
    //clean Up
    return () => {
      dispatch_private({
        type: 'VIEW_NOTE',
        view: { list: [], name: '', order: '' },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="manage-items">
      <ul id="on-my-list">
        <label className={reverse ? 'active' : ''} onClick={() => setReverse(!reverse)}>
          {name} {reverse ? <span>&#8628;</span> : <span>&#62;</span>}
        </label>
        {reverse && <ItemOption select={select} length={length} />}
      </ul>
    </div>
  );
};

export { Item as default };
