const notesSearch = (notes, {text, startDate, endDate, sortBy}) => {

    return notes.filter((note)=>{
        return note.title.includes(text) && 
        (!endDate || endDate >= note.eDate) && 
        (!startDate || note.sDate >= startDate)
      }).sort((a,b)=>{
          if(sortBy==='date'){
            return a.sDate > b.sDate ? 1: `${a.sDate === b.sDate && a.eDate > b.eDate ? 1 : -1}`
            } else if (sortBy==='type'){ 
                a= a.title.toLowerCase();
                b= b.title.toLowerCase();
                return a.localeCompare(b)
          }
        })
    }

export default notesSearch;