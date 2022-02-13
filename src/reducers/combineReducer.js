import combineReducers from 'react-combine-reducers';
import notesReducer from './notes';
import filterReducer from './filter';
import privateReducer from './private';

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

const [reducer, initial] = combineReducers({
  notes: [notesReducer, initNotes],
  filters: [filterReducer, initFilters],
  private: [privateReducer, initPrivate],
});
export { reducer, initial };
