const notesSearch = (notes, { text, startDate, endDate, sortBy, activityType }) => {
  return notes
    .filter((note) => {
      const length = note.selected.filter((el) => el[0] === activityType).length;
      return (
        note.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) &&
        (!endDate || endDate >= note.eDate) &&
        (!startDate || note.sDate >= startDate) &&
        (!activityType ? 1 : length > 0)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'sDate') {
        return a.sDate > b.sDate ? 1 : `${a.sDate === b.sDate && a.eDate > b.eDate ? 1 : -1}`;
      }
      if (sortBy === 'eDate') {
        return a.eDate > b.eDate ? 1 : `${a.eDate === b.eDate && a.sDate > b.sDate ? 1 : -1}`;
      }
    });
};

export default notesSearch;

// else if (sortBy === 'type') {
//   a = a.title.toLowerCase();
//   b = b.title.toLowerCase();
//   return a.localeCompare(b);
// } else return console.log('sortby has no valid data');
