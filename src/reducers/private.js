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
        const itemsNew = state.items.map((item)=>{
          if(item.key===action.key){ 
            item=action.item
          }
          return item
        })
        console.log('work my edit',action,itemsNew)
        return {items:itemsNew}
      
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