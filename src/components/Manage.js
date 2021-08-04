import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { history } from '../routers/AppRouter';
import NoteContext from '../context/notes-context';

const Manage = () => {
  let id = useParams();
  const { state } = useContext(NoteContext);
  const note = state.notes.filter((el) => el.key === id.id)[0];

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      {note !== undefined && note.key}
    </div>
  );
};

export { Manage as default };
