import { format, toDate } from 'date-fns';

const Info = ({ note }) => (
  <div>
    <h3>Title: {note.title} </h3>
    <p> Body:{note.body} </p>
    {note.selected.map((el) => (
      <p key={el}>{` ${el[1]} adet ${el[0]}`}</p>
    ))}
    <p>StartDate: {format(toDate(note.sDate), 'MM/dd/yyyy')}</p>
    <p>EndDate: {format(toDate(note.eDate), 'MM/dd/yyyy')}</p>
  </div>
);

export { Info as default };
