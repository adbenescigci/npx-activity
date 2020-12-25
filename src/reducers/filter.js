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
        default:
            return state
    }
}

export {filterReducer as default}