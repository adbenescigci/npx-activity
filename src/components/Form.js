import {useState} from 'react';
import DatePicker from 'react-datepicker';
import {getTime} from 'date-fns';
import activityList from '../JSON/activity.json'

import "react-datepicker/dist/react-datepicker.css";

const activity= activityList.reduce((acc,current)=>{return [...acc,current.activity]},[])

const Form = ({onSubmitForm,data})=>{
    
const [title,setTitle] = useState(data.title);
const [body,setBody] = useState(data.body);
const [startDate, setStartDate] = useState(data.sDate);
const [endDate, setEndDate] = useState(data.eDate ? data.eDate : startDate);

let [select,setSelect]=useState([]);
const selectedList= Array.from(select, x=> x[0])

const selectPreap = (a)=> { 
    
    const activitySelects = activityList.filter(el=>el.activity === a[0])[0].select

    //Number of Times we need activity status
    let numb=1
    let wholeArray=[]
    
    do{
        const selectable=Array.from(activitySelects, x=> ({name:x, status:'unRead', userToken:'', number:numb}))
        wholeArray= wholeArray.concat([selectable])
        numb = numb+1
    } while(numb<=a[1])

    return [...a,wholeArray]
}

const selected = select.reduce((acc,current)=>{
    
    return [...acc, selectPreap(current)]

},[])

const submitForm = (e)=>{
    e.preventDefault();
    const sDate=getTime(startDate);
    const eDate=getTime(endDate);
    onSubmitForm({title,body,sDate,eDate,selected});
    console.log(selected)
    setTitle('');
    setBody('');
    setStartDate();
    setEndDate();
    setSelect([]);
}

const onClickListItem = (option)=>{

    if(!selectedList.includes(option)){
       return setSelect([...select,[option,'1']])
    } else  {return onRemove(option)} 
}

const onChangeNumber= (e, option) => {   
        const index= selectedList.findIndex(el => el === option )
        select[index]= [option,e.target.value]; 
        setSelect(select)
}

const onRemove = (option) =>{
    select = select.filter(el => el[0] !== option ) 
    setSelect(select) 
}

    return <form onSubmit = {submitForm}>
        <input 
            value={title} 
            placeholder={data.title} 
            onChange = {(e)=>setTitle(e.target.value)} 
            required
        />
        <textarea 
            value={body} 
            placeholder={data.body} 
            onChange = {(e)=>setBody(e.target.value)}
            required 
        />
        <DatePicker 
            selected={startDate}
            onChange={date => {setEndDate(); return setStartDate(date)}}
            minDate={new Date()}
            placeholderText='Start Date'
            isClearable
            required
        />
        <DatePicker
            selected={endDate} 
            onChange={date => {setEndDate(date)}} 
            minDate={startDate}
            placeholderText='End Date'
            isClearable
            required
        />

        { activity.map((option)=>
            <p 
                key={option} 
            >
                <input 
                    onChange={()=>onClickListItem(option)}
                    type="checkbox" 
                    id={option} 
                    name="select" 
                    value="activity"
                    checked={selectedList.includes(option)}
                />

                <label > {option} </label><br/> 

                { selectedList.includes(option) &&
                <> 
                    <input 
                        onChange= {(e) => onChangeNumber(e,option)}  
                        type ='number' 
                        defaultValue= '1' 
                        min ='1' 
                        max = '100'
                    /> 
                    <span 
                        onClick = {()=> onRemove(option)}> x 
                    </span>
                </>
                }   
            </p>  
           )
        }

        <button  disabled = {select.length===0}>submit</button>
    </form>  
}

Form.defaultProps={
   data:{
       title:'',
       body:''
   }
}

export {Form as default}



