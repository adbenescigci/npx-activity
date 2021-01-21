const privateReducer = ( state , action ) => {

    switch(action.type) {
      case 'POPULATE_MY_NOTES':
        return action.myItems
      case 'ADD_MY_NOTE':
        return {
          ...state,
          items:[...state.items,action.item]
        }
        default: 
          return state
      }
    }
  
export { privateReducer as default }