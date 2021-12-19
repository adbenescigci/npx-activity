import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import NoteContext from '../context/notes-context';

const Manage = () => {
  let id = useParams();
  const { state, dispatch } = useContext(NoteContext);
  const note = state.notes.filter((el) => el.key === id.id)[0];

  const onGoBack = () => {
    history.goBack();
    dispatch({ type: 'VIEW_NOTE', view: { list: [], name: '', order: '' } });
  };

  return (
    <div>
      <button onClick={onGoBack}>Back</button>
      {note !== undefined && (
        <div className="manage">
          <div>
            <h2>{note.body} </h2>
            {note.selected.map((el) => (
              <Item name={el[0]} select={el} key={note.key + el[0]} />
            ))}
          </div>
          <div>
            <ViewNote />
          </div>
        </div>
      )}
    </div>
  );
};

const Item = ({ select, name }) => {
  const [reverse, setReverse] = useState(false);

  return (
    <div>
      <p onClick={() => setReverse(!reverse)}>{name}</p>
      {reverse && <ItemSelect select={select} />}
    </div>
  );
};

const ItemSelect = ({ select }) => {
  const { dispatch } = useContext(NoteContext);
  const order = (el) => select[2].indexOf(el);

  const onDisView = (list, order) => {
    dispatch({ type: 'VIEW_NOTE', view: { list, name: select[0], order } });
  };

  return (
    <div>
      <div>
        {select[2].map((el) => (
          <p key={order(el)} onClick={() => onDisView(select[2][order(el)], order(el) + 1)}>
            {`${order(el) + 1}. hatim`}
          </p>
        ))}
      </div>
    </div>
  );
};

const ViewNote = () => {
  const { state, dispatch } = useContext(NoteContext);
  console.log(state.private.view);
  const view = state.private.view;

  useEffect(() => {
    dispatch({ type: 'VIEW_NOTE', view: { list: [], name: '', order: '' } });
  }, []);

  return (
    <div>
      <p>ViewNote</p>
      {view.list.length > 0 && (
        <h3>
          {view.name} - {view.order} . Hatim
        </h3>
      )}
      {view.list.map((el) => (
        <div key={el.name}>
          <h4>
            {el.name} - {el.status}
            {el.userToken}
          </h4>
        </div>
      ))}
    </div>
  );
};

export { Manage as default };
