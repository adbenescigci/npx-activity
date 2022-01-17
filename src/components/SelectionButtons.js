const SelectionButtons = ({ flag = false, option, query, index, note, onClickSelectItems }) => {
  return option[2][query[index] - 1].map((item) => {
    const indexSub = note.selected[index][2][query[index] - 1].indexOf(item);

    return (
      <button
        className="btn btn--small"
        disabled={item.status !== 'unRead' || flag}
        key={item.name}
        onClick={() => onClickSelectItems(item, indexSub)}
      >
        {item.name}
      </button>
    );
  });
};

export { SelectionButtons as default };
