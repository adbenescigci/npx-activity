import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { getTime, addDays } from 'date-fns';
import activityList from '../JSON/activity.json';

import 'react-datepicker/dist/react-datepicker.css';

const activity = activityList.reduce((acc, current) => {
  return [...acc, current.activity];
}, []);

const Form = ({ onSubmitForm, data }) => {
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [startDate, setStartDate] = useState(data.sDate);
  const [endDate, setEndDate] = useState(data.eDate ? data.eDate : startDate);
  let [select, setSelect] = useState([]);

  useEffect(() => {
    if (data.selected !== undefined) {
      setSelect(Array.from(data.selected, (x) => [x[0], x[1]]));
    }
  }, [data]);

  const findValue = (option) => {
    return select.filter((e) => e[0] === option)[0][1];
  };

  const findMin = (option) => {
    if (data.selected !== undefined) {
      const index = data.selected.findIndex((e) => e[0] === option);

      if (index !== -1) {
        const rtdata = data.selected[index][2].reduce(function (acc, cur) {
          if (cur.filter((e) => e.status !== 'unRead').length > 0) {
            acc++;
          }
          return acc;
        }, 0);
        if (rtdata === 0) {
          return 1;
        } else return rtdata;
      } else return 1;
    } else return 1;
  };

  const selectedList = Array.from(select, (x) => x[0]);

  const selectPreap = (a) => {
    const activitySelects = activityList.filter((el) => el.activity === a[0])[0].select;

    let numb = 1;
    let wholeArray = [];

    if (data.selected !== undefined) {
      const index = data.selected.findIndex((b) => b[0] === a[0]);

      if (index !== -1) {
        numb = parseInt(data.selected[index][1]) + 1;
        wholeArray = [...data.selected[index][2]];

        if (data.selected[index][1] >= a[1]) {
          wholeArray = wholeArray.slice(0, a[1]);
        }
      }
    }

    while (numb <= a[1]) {
      // eslint-disable-next-line no-loop-func
      const selectable = Array.from(activitySelects, (x) => ({
        name: x,
        status: 'unRead',
        userToken: '',
        number: numb,
      }));
      wholeArray = wholeArray.concat([selectable]);
      numb = numb + 1;
    }
    return [...a, wholeArray];
  };

  const submitForm = (e) => {
    e.preventDefault();

    const selected = select.reduce((acc, current) => [...acc, selectPreap(current)], []);
    const sDate = getTime(startDate);
    const eDate = getTime(endDate);

    onSubmitForm({ title, body, sDate, eDate, selected });
    setTitle('');
    setBody('');
    setStartDate();
    setEndDate();
    setSelect([]);
  };

  const onClickListItem = (option) => {
    if (!selectedList.includes(option)) {
      return setSelect([...select, [option, findMin(option)]]);
    } else {
      if (data.selected !== undefined) {
        const index = data.selected.findIndex((e) => e[0] === option);
        if (index === -1) {
          onRemove(option);
        } else {
          console.log('Mevcut hatimden paylasim yapilmis AA');
        }
      } else {
        onRemove(option);
      }
    }
  };

  const onChangeNumber = (e, option) => {
    const index = selectedList.findIndex((el) => el === option);
    select[index] = [option, e.target.value === undefined ? 1 : e.target.value];
    setSelect(select);
  };

  const onRemove = (option) => {
    select = select.filter((el) => el[0] !== option);
    setSelect(select);
  };

  return (
    <form className="form" onSubmit={submitForm}>
      <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <textarea value={body} placeholder="Description" onChange={(e) => setBody(e.target.value)} required />
      <div className="form__date">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setEndDate();
            return setStartDate(date);
          }}
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          placeholderText="Start Date"
          isClearable
          required
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
          }}
          minDate={startDate}
          maxDate={addDays(startDate, 60)}
          placeholderText="End Date"
          isClearable
          required
        />
      </div>

      {activity.map((option) => (
        <div className="form__click" key={option}>
          <label> {option} </label>
          <input
            onChange={() => onClickListItem(option)}
            type="checkbox"
            id={option}
            name="select"
            value="activity"
            checked={selectedList.includes(option)}
          />
          <br />

          {selectedList.includes(option) && (
            <div>
              <input
                onChange={(e) => onChangeNumber(e, option)}
                type="number"
                defaultValue={findValue(option)}
                min={findMin(option) === undefined ? 1 : findMin(option)}
                max="100"
              />
            </div>
          )}
        </div>
      ))}

      <button className="btn btn--big" disabled={select.length === 0}>
        submit
      </button>
    </form>
  );
};

Form.defaultProps = {
  data: {
    title: '',
    body: '',
  },
};

export { Form as default };
