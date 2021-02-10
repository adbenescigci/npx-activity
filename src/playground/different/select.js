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

// const onActivitySelect = (e)=>{

//     if (selectedList.includes(e.target.value)) {
//         select = select.filter((el)=> el[0] !== e.target.value)
//     } else 
//         select = [...select, [e.target.value,'1']]

//     setSelect(select)
// }


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