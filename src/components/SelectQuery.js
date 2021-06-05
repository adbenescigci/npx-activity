import {useState,useEffect} from 'react';

const SelectQuery = ({option, onChangeQuery})=> {

  const [hatimOrd,setHatimOrd] = useState(1)
  const [finishFlag,setFlag] = useState( false )

  useEffect(()=>{

    const query = option[2].map( el => el.filter( item => item.status === 'unRead' ).length > 0 ).findIndex( el => el === true)
      
    if(query !== -1) { 
      setHatimOrd (query+1) 
    } 
        else {  setFlag(true); 
                setHatimOrd (option[2].length+1) 
              }

    onChangeQuery(hatimOrd, finishFlag ,option[2].length)

    console.log(hatimOrd, 'unfinished', option[2].length, query)
    
  },[hatimOrd, finishFlag])

    return  <div>
              {(hatimOrd <= option[2].length) ? 
                  `${hatimOrd}.hatim / ${option[2].length}` : 
                  'tamamlandi'
              }
            </div>
  }

  export {SelectQuery as default}

// <select
// name='query'
// onChange={(e)=> onChangeQuery(e.target.value) }
// >
// {test}
// {option[2].map( item => (
// <option 
// key={option[2].indexOf(item)} 
// value = {option[2].indexOf(item)+1}
// > 
// {option[2].indexOf(item)+1} 
// </option>
// ))
// }
// </select>




  //let current = 0

  // const findDisabled = (item)=> {
    
  //   const check = option[2][item].filter( e => e.status === 'unRead').length === 0;    
  //   if( check) {current++}
    
  //   if( item === current ) { return false }
  //     else if (item < current ) return true 
  //           else return !check
  // }

