import { useContext } from 'react';
import { history } from '../../routers/AppRouter';
import Form from '../Form';
import NotesContext from '../../context/notes-context';

import database from '../../firebase/firebase';

const AddNoteForm = () => {
  const { state, dispatch } = useContext(NotesContext);
  const id = state.filters.uid;
  async function addNote({ title, body, sDate, eDate, selected }) {
    await database
      .ref('notes')
      .push({ title, body, id, sDate, eDate, selected })
      .then((ref) => {
        dispatch({
          type: 'ADD_NOTE',
          title,
          body,
          id,
          key: ref.key,
          sDate,
          eDate,
          selected,
        });
      });
  }
  return (
    <div>
      <h2>Add Activity</h2>
      {state.notes.filter((el) => el.id === id).length < 3 ? (
        <Form onSubmitForm={(e) => addNote(e)} />
      ) : (
        <div>
          <h4> You have 3 activities, to add new activity you should drop one of your activities </h4>
          <button onClick={() => history.push(`/myPage/${id}/MyActivities`)}> Go to My Activities</button>
        </div>
      )}
    </div>
  );
};

export { AddNoteForm as default };
