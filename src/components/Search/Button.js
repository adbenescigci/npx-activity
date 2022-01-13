const Button = ({ activityList, activityType, handleActivityFilter }) => {
  return (
    <>
      <label>Filter</label>
      <div className="filter-button">
        {activityList.map((el) => {
          return (
            <button
              className={activityType.includes(el.activity) ? 'btn btn--filtered' : 'btn btn--notFiltered'}
              onClick={() => handleActivityFilter(el)}
              key={el.activity}
              value={el.activity}
            >
              {el.activity}
            </button>
          );
        })}
      </div>
    </>
  );
};

export { Button as default };
