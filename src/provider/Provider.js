import { useReducer } from 'react';
import { DispatchContext, StateContext } from '../context/notes-context';

import notesReducer from '../reducers/notes';
import filterReducer from '../reducers/filter';
import privateReducer from '../reducers/private';

const initNotes = [];
const initFilters = { text: '', activityType: [], date: 0, sortBy: 'sDate', uid: '', note: '' };
const initPrivate = {
  personal: { name: '', delete: false },
  items: [],
  view: {
    list: [],
    name: '',
    order: '',
  },
};

const Provider = ({ children }) => {
  const [state_notes, dispatch_notes] = useReducer(notesReducer, initNotes);
  const [state_filters, dispatch_filters] = useReducer(filterReducer, initFilters);
  const [state_private, dispatch_private] = useReducer(privateReducer, initPrivate);

  return (
    <DispatchContext.Provider value={{ dispatch_notes, dispatch_private, dispatch_filters }}>
      <StateContext.Provider value={{ state_notes, state_private, state_filters }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default Provider;
