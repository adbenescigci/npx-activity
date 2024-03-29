import React, { useState, useEffect, useMemo } from 'react';

const SelectQuery = ({ option, onChangeQuery }) => {
  const [hatimOrd, setHatimOrd] = useState(1);
  const [finishFlag, setFlag] = useState(false);

  const query = useMemo(
    () =>
      option[2]
        .map((el) => el.filter((item) => item.status === 'unRead').length > 0)
        .findIndex((el) => el === true),
    [option]
  );

  const length = option[2].length;

  useEffect(() => {
    if (query !== -1) {
      setHatimOrd(query + 1);
    } else {
      setFlag(true);
      setHatimOrd(length + 1);
    }
  }, [length, query]);

  useEffect(() => {
    onChangeQuery(hatimOrd, length);
    // eslint-disable-next-line
  }, [hatimOrd, length, finishFlag]);

  return (
    <div>
      {hatimOrd <= option[2].length
        ? `${hatimOrd}.grup / ${option[2].length}`
        : 'tamamlandi'}
    </div>
  );
};

export default React.memo(SelectQuery);
