import { useContext, useEffect } from 'react';
import { StateContext, DispatchContext } from '../../../context/notes-context';

const ItemOption = ({ select, length }) => {
  const { state_private } = useContext(StateContext);
  const { dispatch_private } = useContext(DispatchContext);
  const order = (el) => select[2].indexOf(el);

  const onDisView = (list) => {
    dispatch_private({ type: 'VIEW_NOTE', view: { list, name: select[0], order: order(list) + 1 } });
  };
  const isActive = (el) => {
    if (select[0] === state_private.view.name) {
      return state_private.view.order === order(el) + 1;
    }
  };

  useEffect(() => {
    if (length === 1)
      dispatch_private({
        type: 'VIEW_NOTE',
        view: { list: select[2][0], name: select[0], order: 1 },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {select[2].map((el) => (
        <li className={isActive(el) ? 'active' : ''} key={order(el)} onClick={() => onDisView(el)}>
          {`${order(el) + 1}. hatim`}
        </li>
      ))}
    </>
  );
};

export { ItemOption as default };
