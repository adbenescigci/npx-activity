import combineReducers from 'react-combine-reducers';
import notesReducer from './notes';
import filterReducer from './filter';

const initNotes = [];
const initFilters = {text:'', date:0 , sortBy:'date'};

const [reducer, initial] = combineReducers({
  notes: [notesReducer, initNotes],
  filters: [filterReducer, initFilters]
});

export { reducer, initial }

