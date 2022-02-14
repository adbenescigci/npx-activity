import { useContext, memo, useMemo } from 'react';
import { StateContext, DispatchContext } from '../../context/notes-context';
import database from '../../firebase/firebase';

const MySelections = ({ className = '', id }) => {
  const { state_private, state_notes } = useContext(StateContext);
  const { dispatch_private } = useContext(DispatchContext);
  const item = useMemo(
    () => state_private.items.filter((e) => e.status !== 'completed'),
    [state_private.items]
  );

  const style = `mySelections${className}`;

  async function removeMyItem(el) {
    const note = state_notes.filter((item) => item.key === el.noteKey)[0];
    const update = {
      name: el.item,
      number: el.queryIndex + 1,
      status: 'unRead',
      userToken: '',
    };

    const updates = {};
    updates[
      '/notes/' +
        note.key +
        '/selected/' +
        el.index +
        '/2/' +
        el.queryIndex +
        '/' +
        el.indexSub
    ] = update;
    updates['/private/' + id + '/mySelections/' + el.key] = [];

    await database.ref().update(updates);
    dispatch_private({ type: 'REMOVE_MY_NOTE', key: el.key });
  }

  async function editMyItem(el) {
    const note = state_notes.filter((item) => item.key === el.noteKey)[0];
    const update = {
      name: el.item,
      number: el.queryIndex + 1,
      status: 'completed',
      userToken: id,
    };

    const editedItems = state_private.items.map((item) => {
      if (item.key === el.key) {
        item = { ...el, status: 'completed' };
      }
      return item;
    });

    const updates = {};
    updates[
      '/notes/' +
        note.key +
        '/selected/' +
        el.index +
        '/2/' +
        el.queryIndex +
        '/' +
        el.indexSub
    ] = update;
    updates['/private/' + id + '/mySelections/' + el.key + '/status'] = 'completed';

    await database.ref().update(updates);
    dispatch_private({ type: 'EDIT_MY_NOTE', editedItems });
  }

  return (
    <div className="mySelection-container">
      {className === '' && <h2> My Selections </h2>}
      <div className={style}>
        {className !== '' && <h2> My Selections </h2>}
        {!!item[0]
          ? item.map((el) => (
              <div className="selection-card" key={el.key}>
                <div>
                  <h3>
                    {' '}
                    {el.name}-{el.item}
                  </h3>
                  <h6> {el.id} </h6>
                  <h6> {el.noteKey} </h6>
                </div>
                <div className="mySelections__buttons">
                  <button onClick={() => editMyItem(el)}>completed</button>
                  <button
                    className="btn btn--red btn--small"
                    onClick={() => removeMyItem(el)}
                  >
                    withdraw
                  </button>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default memo(MySelections);
