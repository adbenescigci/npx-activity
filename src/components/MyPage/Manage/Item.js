import { useState } from 'react';
import ItemOption from './ItemOption';

const Item = ({ select, name, length }) => {
  const [reverse, setReverse] = useState(length === 1 ? true : false);

  return (
    <div className="manage-items">
      <ul id="on-my-list">
        <label onClick={() => setReverse(!reverse)}> {name} </label>
        {reverse && <ItemOption select={select} length={length} />}
      </ul>
    </div>
  );
};

export { Item as default };
