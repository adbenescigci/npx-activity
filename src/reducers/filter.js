const filterReducer= (state,action)=>{
    
    switch(action.type){
        case 'SET_TEXT' :
            return {...state, text:action.text}
        case 'SET_START_DATE':
            return {...state, startDate:action.startDate}
        case 'SET_END_DATE':
            return {...state, endDate:action.endDate}
        case 'SORT_BY':
            return {...state, sortBy:action.sortBy}
        case 'SET_ID':
            return {...state, uid:action.uid }
        case 'SET_NOTE':
            return {...state, note:action.note}
        default:
            return state
    }
}

export {filterReducer as default}