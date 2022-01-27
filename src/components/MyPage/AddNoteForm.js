import { useContext, useState, useEffect } from 'react';
import { history } from '../../routers/AppRouter';
import Form from '../Form';
import NotesContext from '../../context/notes-context';
import { alert } from '../../utils/alert';

import database from '../../firebase/firebase';

const AddNoteForm = () => {
  const { state, dispatch } = useContext(NotesContext);
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState('');
  const id = state.filters.uid;

  const message = 'Succesfully added';
  const className = `alert alert--${data === message ? 'success' : 'error'}`;

  async function addNote({ title, body, sDate, eDate, selected }) {
    await database
      .ref('notes')
      .push({ title, body, id, sDate, eDate, selected })
      .then((ref) => {
        setData(message);
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
      })
      .catch((err) => {
        setData(err.message);
      });
    setFlag(true);
  }

  useEffect(() => {
    let mounted = true;

    setTimeout(() => {
      if (mounted) {
        setFlag(false);
      }
    }, 5 * 1000);

    //cleanup
    return () => {
      mounted = false;
    };
  }, [flag]);

  return (
    <div className="myRouter-container">
      <h2>Add Activity</h2>
      {flag && <div className={className}> {data} </div>}
      {state.notes.filter((el) => el.id === id).length < 3 ? (
        <Form onSubmitForm={(e) => addNote(e)} />
      ) : (
        <div>
          <h4>
            {' '}
            You have 3 activities, to add new activity you should drop one of your activities{' '}
          </h4>
          <button onClick={() => history.push(`/myPage/${id}/MyActivities`)}>
            {' '}
            Go to My Activities
          </button>
        </div>
      )}
    </div>
  );
};

export { AddNoteForm as default };
