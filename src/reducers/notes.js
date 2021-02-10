const notesReducer = (state, action) => {

    switch(action.type) {
      case 'POPULATE_NOTES':
        return action.notes
      case 'ADD_NOTE':
        return [
          ...state,
          {
           title: action.title, 
           body: action.body, 
           id: action.id, 
           key: action.key, 
           sDate: action.sDate, 
           eDate:action.eDate,
           selected:action.selected
          }
        ]
      case 'EDIT_NOTE':
        const stateNew = state.map((note)=>{
          if(note.key===action.key){ 
            note={...note,...action.note}
          }
          return note
        })
        return stateNew
      case 'REMOVE_NOTE':
        return state.filter((note)=>{ 
          return note.key !== action.key
        })
      default: 
        return state
    }
  }

  export { notesReducer as default }