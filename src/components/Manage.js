import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import NoteContext from '../context/notes-context';

const Manage = () => {
  let id = useParams();
  const { state } = useContext(NoteContext);
  const note = state.notes.filter((el) => el.key === id.id)[0];

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      {note !== undefined && (
        <div>
          <h2>{note.body} </h2>
          {note.selected.map((el) => (
            <Item name={el[0]} select={el[2]} key={note.key + el[0]} />
          ))}
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

const ItemSelect = ({ select, name }) => {
  return (
    <div>
      {select.map((el) => (
        <p key={select.indexOf(el)}>{`${select.indexOf(el) + 1}. hatim`}</p>
      ))}
      {console.log(select)}
    </div>
  );
};

export { Manage as default };
