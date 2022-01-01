import { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { getTime } from 'date-fns';
import NotesContext from '../context/notes-context';
import activityList from '../JSON/activity.json';

const Search = () => {
  const { state, dispatch } = useContext(NotesContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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

  const handleAcivityFilter = (el) => {
    let activityType = state.filters.activityType;

    if (activityType.length !== 0) {
      if (!activityType.includes(el.activity)) {
        activityType.push(el.activity);
      } else {
        activityType = activityType.filter((e) => e !== el.activity);
      }
    } else activityType.push(el.activity);

    dispatch({ type: 'SET_ACTIVITY_TYPE', activityType });
  };

  const className = 'btn btn--filtered';

  return (
    <>
      <h3>Search</h3>

      <input placeholder="Search by text" value={state.filters.text} onChange={(e) => onSetText(e)} />

      <DatePicker
        placeholderText="Search by start date"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        isClearable
      />
      <DatePicker
        placeholderText="Search by end date"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        minDate={new Date()}
        isClearable
      />
      <select onChange={onSortChange}>
        <option value="sDate"> Start Date </option>
        <option value="eDate"> End Date </option>
      </select>
      <div>
        {activityList.map((el) => {
          //console.log(el.activity);
          return (
            <button className={className} onClick={() => handleAcivityFilter(el)} key={el.activity} value={el.activity}>
              {el.activity}
            </button>
          );
        })}
      </div>
    </>
  );
};

export { Search as default };
