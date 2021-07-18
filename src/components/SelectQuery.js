import { useState, useEffect } from 'react';

const SelectQuery = ({ option, onChangeQuery }) => {
  const [hatimOrd, setHatimOrd] = useState(1);
  const [finishFlag, setFlag] = useState(false);

  const query = option[2]
    .map((el) => el.filter((item) => item.status === 'unRead').length > 0)
    .findIndex((el) => el === true);

  const length = option[2].length;

  useEffect(() => {
    if (query !== -1) {
      setHatimOrd(query + 1);
    } else {
      setFlag(true);
      setHatimOrd(length + 1);
      console.log('test');
    }
  }, [length, query]);

  useEffect(() => {
    onChangeQuery(hatimOrd, length);
  }, [hatimOrd, length, finishFlag]);

  return <div>{hatimOrd <= option[2].length ? `${hatimOrd}.hatim / ${option[2].length}` : 'tamamlandi'}</div>;
};

export { SelectQuery as default };
