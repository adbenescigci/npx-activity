import combineReducers from 'react-combine-reducers';
import notesReducer from './notes';
import filterReducer from './filter';
import privateReducer from './private';

const initNotes = [];
const initFilters = {text:'', date:0 , sortBy:'date', uid:''};
const initPrivate = {personal:{name:'', delete:false}, items:[] };

const [reducer, initial] = combineReducers({
  notes: [notesReducer, initNotes],
  filters: [filterReducer, initFilters],
  private: [privateReducer, initPrivate]
});

export { reducer, initial }

