import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import NoteContext from '../../../context/notes-context';
import ViewNote from './ViewNote';
import Item from './Item';

const Manage = () => {
  let id = useParams();
  const { state } = useContext(NoteContext);
  const note = state.notes.filter((el) => el.key === id.id)[0];

  return (
    <div className="manage-container">
      <div className="manage-header">
        {!!note && (
          <h2>
            Manage <span>'{note.body}'</span>{' '}
          </h2>
        )}
      </div>
      <div>
        {!!note && (
          <div className="manage">
            <div className="manage-activities">
              {note.selected.map((el) => {
                return (
                  <Item
                    name={el[0]}
                    select={el}
                    key={note.selected.indexOf(el)}
                    length={note.selected.length}
                  />
                );
              })}
            </div>
            <ViewNote />
          </div>
        )}
      </div>
    </div>
  );
};

export { Manage as default };
