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
           eDate:action.eDate
          }
        ]
      case 'EDIT_NOTE':
        const stateNew = state.map((note)=>{
          if(note.id===action.id){ 
            note={...note,...action.note}
          }
          return note
        })
        return stateNew
      case 'REMOVE_NOTE':
        return state.filter((note)=>{ 
          return note.id !== action.id
        })
      default: 
        return state
    }
  }

  export { notesReducer as default }