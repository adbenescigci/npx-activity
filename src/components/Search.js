import {useEffect, useState, useContext} from 'react';
import DatePicker from 'react-datepicker';
import { getTime } from 'date-fns';
import NotesContext from '../context/notes-context';

const Search = () => {

    const {state,dispatch} = useContext (NotesContext)
    const [startDate, setStartDate]= useState();
    const [endDate, setEndDate]= useState();
  
    const onSetText = (e)=>{
    dispatch({type: 'SET_TEXT', text: e.target.value})
    }

    const onSortChange = (e)=>{
      dispatch({type: 'SORT_BY', sortBy:e.target.value})
    }

    useEffect(()=>{
      dispatch({type: 'SET_START_DATE', startDate: getTime(startDate)})
    },[startDate, dispatch])
    
    useEffect(()=>{
      dispatch({type: 'SET_END_DATE', endDate:getTime(endDate)})
    },[endDate, dispatch])
    
    useEffect(()=>{
      console.log(state)
    },[state])

    return  <>
        <h3>Search</h3>
        <input 
          placeholder= 'Search by text' 
          value = {state.filters.text} 
          onChange = {(e)=>onSetText(e)}
        />
        
        <DatePicker 
          placeholderText='Search by start date'
          selected={startDate} 
          onChange={date => setStartDate(date)} 
          minDate={new Date()}
          isClearable
        />
        <DatePicker 
          placeholderText='Search by end date'
          selected={endDate}
          onChange={date => setEndDate(date)} 
          minDate={new Date()}
          isClearable
        />
        <select onChange={onSortChange}>
          <option value = 'date'> Date </option>
          <option value = 'type'> Type </option>
        </select>
      </>
  }

  export { Search as default }