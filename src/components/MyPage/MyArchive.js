import { useEffect, useState, useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/notes-context';
import database from '../../firebase/firebase';

const MyArchive = () => {
  const { state_private, state_filters } = useContext(StateContext);
  const { dispatch_private } = useContext(DispatchContext);
  const [items, setItems] = useState([]);
  const id = state_filters.uid;

  const completed = state_private.items.filter((e) => e.status === 'completed');

  useEffect(() => {
    setItems(state_private.archive);
  }, [state_private.archive]);

  const onRemoveArchiveItems = (key) =>
    database
      .ref('private/' + id + '/myArchive/' + key)
      .remove()
      .then(() => dispatch_private({ type: 'REMOVE_ARCHIVE_ITEM', key }));

  const onRemoveArchive = () => {
    database
      .ref('private/' + id + '/myArchive')
      .remove()
      .then(() => dispatch_private({ type: 'REMOVE_ARCHIVE' }));
  };
  return (
    <div className="myRouter-container">
      <h2> My Archive </h2>
      {items !== undefined &&
        (items.length !== 0 ? (
          <button onClick={onRemoveArchive}> DeleteAll </button>
        ) : (
          'Arsivinizde bir kayit bulunmamaktadir'
        ))}
      <br></br>
      <div className="myArchive">
        {items !== undefined &&
          items.map((item) => (
            <div className="myArchive__items" key={item.key}>
              <p>
                {' '}
                {item.name} - {item.item}
              </p>
              <button onClick={() => onRemoveArchiveItems(item.key)}> remove </button>
            </div>
          ))}
      </div>

      <h3> My Completed Items</h3>
      {completed.map((e) => (
        <div key={e.key}>
          <p>
            {' '}
            {e.name} - {e.item}
          </p>
        </div>
      ))}
    </div>
  );
};

export { MyArchive as default };
