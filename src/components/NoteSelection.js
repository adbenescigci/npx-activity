import { useContext, useState, useEffect } from 'react';
import NoteContext from '../context/notes-context';
import {singleInit} from '../actions/init';
import database from '../firebase/firebase';

const NoteSelection = ({note})=>{
  
    const {state,dispatch} = useContext(NoteContext);
    const [query,setQuery] = useState(Array.from(note.selected, () => 1 )) 
    const [blind, setBlind] = useState(true)
    const id= state.filters.uid;
    const [backList,setBackList] = useState([])
    let [selectableList,setSelectableList]=useState([]);

    async function resume (key) {
        singleInit(key).then((note)=>{
          dispatch({type: 'EDIT_NOTE', note, key})
        })
      }
    
    const onBack = ()=>{
      const updates = {};

      backList.map((e)=>{
     
        updates['/notes/' + note.key + '/selected/' + e.index + '/2/' + e.queryIndex + '/' + e.indexSub ] = {...e.item, status:'unRead', userToken:''};
        updates['/private/' + id + '/mySelections/' + e.key] = [];
        
        dispatch({type: 'REMOVE_MY_NOTE', key: e.key})
      })
      
      setBackList([]);
      database.ref().update(updates).then(()=>{ resume(note.key)})
        
    }

    const onClickSelectItems =  (option, item, index, indexSub, queryIndex) => {

      database.ref('/notes/' + note.key + '/selected/' + index + '/2/' + queryIndex + '/' + indexSub + '/userToken').once('value', function (snapshot){
  
        if( snapshot.val() === ''){
          
          const update = {...item, status:'taken', userToken:id};
          const selectData = {
            name:option[0],
            id:note.id, 
            noteKey:note.key, 
            item:item.name, 
            status: 'taken', 
            index, 
            indexSub, 
            queryIndex
          }
          
          const key = database.ref().child('/private/'+ id +'/mySelections').push().key;
  
          const updates = {};
          updates['/notes/' + note.key + '/selected/' + index + '/2/' + queryIndex + '/' + indexSub] = update;
          updates['/private/' + id + '/mySelections/' + key] = selectData
    
          setBackList([...backList,{item, index, indexSub, queryIndex, selectData, key}]);
  
          database.ref().update(updates).then(()=>{
            dispatch({type: 'ADD_MY_NOTE', item: { ...selectData, key }})
          })
        }
        else console.log('daha once alinmis')})   
        resume(note.key)
      }
    
      const onChangeQuery = (value,index,option) => {
        console.log(value,index,option)
        setBlind(false)
        query[index]=parseInt(value)
        setQuery(query)
      }
    
      useEffect(()=>{
        console.log('test')
       setBlind(true)
      })
    

      const onClickListItem = (option) => {
    
        if(!selectableList.includes(option)){
            return setSelectableList([...selectableList,option])
        } else  onRemoveSelect(option)
      }
    
      const onRemoveSelect = (option) =>{
        selectableList = selectableList.filter(el => el !== option )
        setSelectableList(selectableList)
      }

    return (
        <div>
          {note.selected.map((option) => {
            const index = note.selected.indexOf(option)
            return <div key={option}>
                      <input
                          onChange={() => onClickListItem(option[0])}
                          type="checkbox"
                          id={option}
                          name="select"
                          value="activity"
                          checked={selectableList.includes(option[0])}
                      />
    
                      <label>{option[0]}</label> <br/>
    
                      {selectableList.includes(option[0]) && 
                        <div>
                          <select
                          name='query'
                          onChange={(e)=> onChangeQuery(e.target.value,index,option) }
                          >
                            {option[2].map((item)=>(
                              <option key={option[2].indexOf(item)} value = {option[2].indexOf(item)+1}> {option[2].indexOf(item)+1} </option>
                            ))
                            }
                          </select>
                          
                          {blind && option[2][query[index]-1].map(item => {
                              const indexSub = note.selected[index][2][query[index]-1].indexOf(item)
                              return <button
                                        disabled = {item.status!=='unRead' }
                                        key={item.name}
                                        onClick = {() => onClickSelectItems(option,item, index, indexSub, query[index]-1)}
                                      >
                                        {item.name}
                                      </button>
                            })
                          }
                        </div>
                      }
                  </div> })
          }
          
          {backList.map((e)=>{
            return <p key= {e.key}>{e.selectData.name}, {e.selectData.item}</p>
          })}
          
          <button onClick= {() => dispatch({type:'SET_NOTE', note:''})}> {backList.length> 0 ? 'OK': 'Back'}</button>
          {backList.length >0 && <button onClick= {() => {onBack()}} > Vazgec</button>}
    
        </div>
        )
}

export {NoteSelection as default}