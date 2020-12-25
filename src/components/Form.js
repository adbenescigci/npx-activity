import {useState} from 'react';
import DatePicker from 'react-datepicker';
import {getTime} from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";

const Form = ({onSubmitForm,data})=>{
    
const [title,setTitle] = useState('');
const [body,setBody] = useState('');
const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState(startDate);

const submitForm = (e)=>{
    e.preventDefault();
    const sDate=getTime(startDate);
    const eDate=getTime(endDate);
    onSubmitForm({title,body,sDate,eDate});
    setTitle('');
    setBody('');
    setStartDate();
    setEndDate();
}
    return <form onSubmit = {submitForm}>
        <input 
            value={title} 
            placeholder={data.title} 
            onChange = {(e)=>setTitle(e.target.value)} 
        />
        <textarea 
            value={body} 
            placeholder={data.body} 
            onChange = {(e)=>setBody(e.target.value)} 
        />
        <DatePicker 
            selected={startDate}
            onChange={date => {setEndDate(); return setStartDate(date)}}
            minDate={new Date()}
            placeholderText='Start Date'
            isClearable
        />
        <DatePicker
            selected={endDate} 
            onChange={date => {setEndDate(date)}} 
            minDate={startDate}
            placeholderText='End Date'
            isClearable
        />
        <button disabled = {!(startDate && endDate && title && body)}>submit</button>
    </form>
}

Form.defaultProps={
   data:{
       title:'',
       body:''
   }
}

export {Form as default}