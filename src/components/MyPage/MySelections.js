import { useContext } from 'react';
import NotesContext from '../../context/notes-context';
import database from '../../firebase/firebase';
import init from '../../actions/init';

const MySelections = ({ className = '' }) => {
  const { state, dispatch } = useContext(NotesContext);
  const id = state.filters.uid;
  const item = state.private.items.filter((e) => e.status !== 'completed');

  async function start() {
    const notes = await init();
    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
    }
  }

  async function removeMyItem(el) {
    const note = state.notes.filter((item) => item.key === el.noteKey)[0];
    const update = {
      name: el.item,
      number: el.queryIndex + 1,
      status: 'unRead',
      userToken: '',
    };

    const updates = {};
    updates['/notes/' + note.key + '/selected/' + el.index + '/2/' + el.queryIndex + '/' + el.indexSub] = update;
    updates['/private/' + id + '/mySelections/' + el.key] = [];

    await database.ref().update(updates);
    dispatch({ type: 'REMOVE_MY_NOTE', key: el.key });
    start();
  }

  async function editMyItem(el) {
    const note = state.notes.filter((item) => item.key === el.noteKey)[0];
    const update = {
      name: el.item,
      number: el.queryIndex + 1,
      status: 'completed',
      userToken: id,
    };

    const editedItems = state.private.items.map((item) => {
      if (item.key === el.key) {
        item = { ...el, status: 'completed' };
      }
      return item;
    });

    const updates = {};
    updates['/notes/' + note.key + '/selected/' + el.index + '/2/' + el.queryIndex + '/' + el.indexSub] = update;
    updates['/private/' + id + '/mySelections/' + el.key + '/status'] = 'completed';

    await database.ref().update(updates);
    dispatch({ type: 'EDIT_MY_NOTE', editedItems });
    start();
  }
  const style = `mySelections${className}`;

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
                  <button className="btn btn--red btn--small" onClick={() => removeMyItem(el)}>
                    delete
                  </button>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export { MySelections as default };
