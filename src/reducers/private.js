const privateReducer = ( state , action ) => {

    switch(action.type) {
      case 'POPULATE_MY_NOTES':
        return action.myItems
      case 'ADD_MY_NOTE':
        return {
          ...state,
          items:[...state.items,action.item]
        }
      case 'EDIT_MY_NOTE':
        return {
          ...state,
          items:action.editedItems
        }
      case 'ADD_MY_ACT':
        console.log(action)
        return state
      case 'REMOVE_MY_NOTE':
        const items = state.items.filter((item)=>{ 
          return (item.key !== action.key) 
        })
        return {
          ...state,
          items
        }
      case 'REMOVE_MY_NOTE_ALL':
        const itemsAll = state.items.filter((item)=>{ 
          return (item.noteKey !== action.key) 
        })
        return {
          ...state,
          items:itemsAll
        }
      default: 
        return state
      }
    }
  
export { privateReducer as default }