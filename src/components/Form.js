import {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import {getTime} from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";


const Form = ({onSubmitForm,data})=>{
    
const [title,setTitle] = useState('');
const [body,setBody] = useState('');
const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState(startDate);

let [select,setSelect]=useState([]);
const selectedList= Array.from(select, x=> x[0])
const [toogle,setToogle]=useState([])

const submitForm = (e)=>{
    e.preventDefault();
    const sDate=getTime(startDate);
    const eDate=getTime(endDate);
    onSubmitForm({title,body,sDate,eDate,select});
    setTitle('');
    setBody('');
    setStartDate();
    setEndDate();
    setSelect([]);
}

const onClickListItem = (option)=>{
    if(!selectedList.includes(option)){
        setSelect([...select,[option,'1']])
    } else { onRemove(option)}
    console.log('onclick p tag')
}

const onChangeNumber= (e, option) => {   
    const index= testArray.findIndex((el)=> el === option )
    if(selectedList.includes(option)) { 
        select[index]= [option,e.target.value]; 
        console.log(select)
        return setSelect(select)
    }
}

const onRemove = (option) =>{
    select = select.filter((el)=>{ return el[0]!==option})
    setSelect(select)
    console.log('remove',select,option)   
}


useEffect(()=>{
    console.log(select,'ts')
},[select])

const testArray = ['Kuran','Cevsen','B Cevsen', 'K Daria'];

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

        { testArray.map((option)=>
            {  
                
            const index= testArray.findIndex((el)=> el === option )
                return <p 
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
           })
        }

        <button  disabled = {!(startDate && endDate && title && body && (select.length>0))}>submit</button>
    </form>  
}

Form.defaultProps={
   data:{
       title:'',
       body:''
   }
}

export {Form as default}



// <select 
// multiple 
// value={['default',...selectedList]} 
// size={testArray.length + 1}
// onChange={(e)=> onActivitySelect(e)}
// >    
// <option disabled value = 'default'> Seciniz </option> 
// {testArray.map((option)=>(
//     <option key={option} value = {option}> {option} </option>
//    ))
// }
// </select>
// <>

// {selectedList.length>0 && <label >Numer of Times</label>}

// {selectedList.map((sel)=>
 
// <p key ={sel}>
//     {sel} 
//     <input onChange= {(e)=> numberOfTimes(e,sel)}  
//         type ='number' 
//         defaultValue= '1' 
//         min ='1' 
//         max = '100'
//     /> 
//     <span onClick = {()=> onRemove(sel)}> x </span>
// </p> 
// )
// }
// </>


// const onActivitySelect = (e)=>{

//     if (selectedList.includes(e.target.value)) {
//         select = select.filter((el)=> el[0] !== e.target.value)
//     } else 
//         select = [...select, [e.target.value,'1']]

//     setSelect(select)
// }


// const numberOfTimes= (e,sel)=>{ 
//     const index = selectedList.findIndex((el)=> el===sel);
//     select[index]= [sel,e.target.value]; 
//     setSelect(select);
    
//     console.log(select,index) ; 
// }

// const onRemove = (sel) => {
//     select = select.filter((el)=> el[0] !== sel);
//     setSelect(select)
// }

 // <option value ='Kuran'>K Kerim</option>
            // <option value ='Cevsen'>Cevsen</option>
            // <option value ='B Cevsen'>B Cevsen</option>
            // <option value= 'K Daria'>K Daria</option>
            //value= {pieces} onChange= {(e)=>setPieces(e)} 