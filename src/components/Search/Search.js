import { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { getTime } from 'date-fns';
import NotesContext from '../../context/notes-context';
import activityList from '../../JSON/activity.json';
import Button from './Button';

const Search = () => {
  const { state, dispatch } = useContext(NotesContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let activityType = state.filters.activityType;

  const onSetText = (e) => {
    dispatch({ type: 'SET_TEXT', text: e.target.value });
  };

  const onSortChange = (e) => {
    dispatch({ type: 'SORT_BY', sortBy: e.target.value });
  };

  useEffect(() => {
    dispatch({ type: 'SET_START_DATE', startDate: getTime(startDate) });
  }, [startDate, dispatch]);

  useEffect(() => {
    dispatch({ type: 'SET_END_DATE', endDate: getTime(endDate) });
  }, [endDate, dispatch]);

  const handleActivityFilter = (el) => {
    if (activityType.length !== 0) {
      if (!activityType.includes(el.activity)) {
        activityType.push(el.activity);
      } else {
        activityType = activityType.filter((e) => e !== el.activity);
      }
    } else activityType.push(el.activity);

    dispatch({ type: 'SET_ACTIVITY_TYPE', activityType });
  };

  return (
    <div className="searchBar">
      <div className="search">
        <input placeholder="Search" value={state.filters.text} onChange={(e) => onSetText(e)} />
        <DatePicker
          placeholderText="Start Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          isClearable
        />
        <DatePicker
          placeholderText="End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={new Date()}
          isClearable
        />
      </div>

      <div className="filter">
        <Button activityList={activityList} activityType={activityType} handleActivityFilter={handleActivityFilter} />
        <select onChange={onSortChange}>
          <option value="sDate"> Start </option>
          <option value="eDate"> End</option>
        </select>
      </div>
    </div>
  );
};

export { Search as default };
