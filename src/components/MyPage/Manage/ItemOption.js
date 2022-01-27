import { useContext, useEffect } from 'react';
import NoteContext from '../../../context/notes-context';

const ItemOption = ({ select, length }) => {
  const { dispatch } = useContext(NoteContext);
  const order = (el) => select[2].indexOf(el);

  const onDisView = (list) => {
    dispatch({ type: 'VIEW_NOTE', view: { list, name: select[0], order: order(list) + 1 } });
  };

  useEffect(() => {
    if (length === 1)
      dispatch({
        type: 'VIEW_NOTE',
        view: { list: select[2][0], name: select[0], order: 1 },
      });

    //clean Up
    return () => {
      dispatch({
        type: 'VIEW_NOTE',
        view: { list: [], name: '', order: '' },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {select[2].map((el) => (
        <li key={order(el)} onClick={() => onDisView(el)}>
          {`${order(el) + 1}. hatim`}
        </li>
      ))}
    </>
  );
};

export { ItemOption as default };
