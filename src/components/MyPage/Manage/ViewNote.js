import { useContext } from 'react';
import { StateContext } from '../../../context/notes-context';

const ViewNote = () => {
  const { state_private } = useContext(StateContext);
  const view = state_private.view;

  return (
    <div className="manage-view">
      {view.list.length > 0 && (
        <label>
          {view.name} - {view.order} . Hatim
        </label>
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

export { ViewNote as default };
