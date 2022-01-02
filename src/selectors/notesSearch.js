const notesSearch = (notes, { text, startDate, endDate, sortBy, activityType }) => {
  return (
    notes
      .filter((note) => {
        const flag = note.selected.filter((el) => activityType.includes(el[0])).length === activityType.length;
        return (
          note.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) &&
          (!endDate || endDate >= note.eDate) &&
          (!startDate || note.sDate >= startDate) &&
          (activityType.length === 0 ? 1 : flag)
        );
      })
      // eslint-disable-next-line array-callback-return
      .sort((a, b) => {
        if (sortBy === 'sDate') {
          return a.sDate > b.sDate ? 1 : `${a.sDate === b.sDate && a.eDate > b.eDate ? 1 : -1}`;
        }
        if (sortBy === 'eDate') {
          return a.eDate > b.eDate ? 1 : `${a.eDate === b.eDate && a.sDate > b.sDate ? 1 : -1}`;
        }
      })
  );
};

export default notesSearch;
