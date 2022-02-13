import { useEffect, useState, useContext, memo } from 'react';
import DatePicker from 'react-datepicker';
import { getTime } from 'date-fns';
import { StateContext, DispatchContext } from '../../context/notes-context';
import activityList from '../../JSON/activity.json';
import Button from './Button';

const Search = () => {
  const { state_filters } = useContext(StateContext);
  const { dispatch_filters } = useContext(DispatchContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  let { text, activityType } = state_filters;

  const onSetText = (e) => {
    dispatch_filters({ type: 'SET_TEXT', text: e.target.value });
  };

  const onSortChange = (e) => {
    dispatch_filters({ type: 'SORT_BY', sortBy: e.target.value });
  };

  useEffect(() => {
    dispatch_filters({ type: 'SET_START_DATE', startDate: getTime(startDate) });
  }, [startDate, dispatch_filters]);

  useEffect(() => {
    dispatch_filters({ type: 'SET_END_DATE', endDate: getTime(endDate) });
  }, [endDate, dispatch_filters]);

  const handleActivityFilter = (el) => {
    if (activityType.length !== 0) {
      if (!activityType.includes(el.activity)) {
        activityType.push(el.activity);
      } else {
        activityType = activityType.filter((e) => e !== el.activity);
      }
    } else activityType.push(el.activity);

    dispatch_filters({ type: 'SET_ACTIVITY_TYPE', activityType });
  };

  return (
    <div className="searchBar">
      <div className="search">
        <input placeholder="Search" value={text} onChange={onSetText} />
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
        <Button
          activityList={activityList}
          activityType={activityType}
          handleActivityFilter={handleActivityFilter}
        />
        <select onChange={onSortChange}>
          <option value="sDate"> Start </option>
          <option value="eDate"> End</option>
        </select>
      </div>
    </div>
  );
};

export default memo(Search);
