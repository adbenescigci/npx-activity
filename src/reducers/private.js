const privateReducer = ( state , action ) => {

    switch(action.type) {
      case 'POPULATE_MY_NOTES':
        return action.myItems
      case 'ADD_MY_NOTE':
        return {
          ...state,
          items:[...state.items,action.item]
        }
      case 'REMOVE_MY_NOTE':
        const items = state.items.filter((note)=>{ 
          return (note.id !== action.id) || (note.item!==action.item)
        })
        return {
          ...state,
          items
        }
      default: 
        return state
      }
    }
  
export { privateReducer as default }