import { useEffect, useState, useContext } from 'react';
import NotesContext from '../../context/notes-context';
import database from '../../firebase/firebase';

const MyArchive = () => {
  const { state, dispatch } = useContext(NotesContext);
  const [items, setItems] = useState([]);
  const id = state.filters.uid;

  const completed = state.private.items.filter((e) => e.status === 'completed');

  useEffect(() => {
    setItems(state.private.archive);
  }, [state.private.archive]);

  const onRemoveArchiveItems = (key) =>
    database
      .ref('private/' + id + '/myArchive/' + key)
      .remove()
      .then(() => dispatch({ type: 'REMOVE_ARCHIVE_ITEM', key }));

  const onRemoveArchive = () => {
    database
      .ref('private/' + id + '/myArchive')
      .remove()
      .then(() => dispatch({ type: 'REMOVE_ARCHIVE' }));
  };
  return (
    <div>
      <h3> My Archive </h3>
      {items !== undefined &&
        (items.length !== 0 ? (
          <button onClick={onRemoveArchive}> DeleteAll </button>
        ) : (
          'Arsivinizde bir kayit bulunmamaktadir'
        ))}
      <br></br>
      {items !== undefined &&
        items.map((item) => (
          <div key={item.key}>
            <p>
              {' '}
              {item.name} - {item.item}
            </p>
            <button onClick={() => onRemoveArchiveItems(item.key)}> x </button>
          </div>
        ))}

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
