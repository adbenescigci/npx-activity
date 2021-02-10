import { useContext, useState } from 'react';
import { format,toDate } from 'date-fns'
import Form from './Form';
import NoteContext from '../context/notes-context';

import database from '../firebase/firebase';

const Note = ({note, place})=> {

  const {state,dispatch} = useContext(NoteContext);
  const [edit,setEdit] = useState(false)
  const [selectActivity,setSelectActivity] = useState(false)
  const [isLogged,setLogIn]= useState(true)
  const [query,setQuery]=useState(Array.from(note.selected, () => '1'))

  const id= state.filters.uid;

  let [selectableList,setSelectableList]=useState([]);

  const onClickSelectItems =  (item, index, indexSub, queryIndex) => {

    note.selected[index][2][queryIndex][indexSub]={...item, status:'taken', userToken:state.filters.uid}

    const selected = note.selected
    updateNote ({...note,selected})
    database.ref(`private/${id}/mySelections`).push({id:note.id, noteKey:note.key, item:item.name, status: 'taken', index, indexSub, queryIndex}).then((el)=>{
      dispatch({type: 'ADD_MY_NOTE', item: { key: el.key, id:note.id, noteKey:note.key, item:item.name, status:'taken', index, indexSub, queryIndex}})
    })
  }

  const onChangeQuery = (value,index)=>{
    query[index]=value
    setQuery(query)
  }

  const onClickListItem = (option)=>{

    if(!selectableList.includes(option)){
        return setSelectableList([...selectableList,option])
    } else  onRemoveSelect(option)

  }

  const onRemoveSelect = (option) =>{
    selectableList = selectableList.filter(el => el !== option )
    setSelectableList(selectableList)
  }


  const onRemove = () => {
    database.ref(`notes/${note.key}`).remove()
      .then(()=>dispatch({type: 'REMOVE_NOTE', key: note.key}))
  }

  async function updateNote ({title,body,sDate,eDate,selected}) {

    await database.ref(`notes/${note.key}`).set({id:note.id, title,body,sDate,eDate,selected})
    dispatch({type: 'EDIT_NOTE', note:{title,body,sDate,eDate,selected}, key: note.key})

    setEdit(false)
  }



  const info = (
    <div>
        <h3>Title: { note.title } </h3>
        <p> Body:{ note.body } </p>
        {note.selected.map(el =>
            <p key={el}>{` ${el[1]} adet ${el[0]}` }</p>)
        }
        <p>StartDate: {format(toDate(note.sDate),'dd/MM/yyyy')}</p>
        <p>EndDate: {format(toDate(note.eDate),'dd/MM/yyyy')}</p>
    </div>
  )

  const select = (
    <div>
      <h2>Title: { note.title } </h2>
      {note.selected.map((option) => {
        const index= note.selected.indexOf(option)
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
                      onChange={(e)=> onChangeQuery(e.target.value,index) }
                      >
                        {option[2].map((item)=>(
                          <option key={option[2].indexOf(item)} value = {option[2].indexOf(item)+1}> {option[2].indexOf(item)+1} </option>
                        ))
                        }
                      </select>

                      {option[2][query[index]-1].map(item => {
                          const indexSub = note.selected[index][2][query[index]-1].indexOf(item)
                          return <button
                                    disabled = {item.status!=='unRead' }
                                    key={item.name}
                                    onClick = {() => onClickSelectItems(item, index, indexSub, query[index]-1)}
                                  >
                                    {item.name}
                                  </button>
                        })
                      }
                    </div>
                  }
              </div> })
      }
    </div>
    )

    const onJoin = ()=>{
         if(state.filters.id !==''){
          setSelectActivity(!selectActivity)
      } else setLogIn(false)
    }

    return (
      <div>
        {note.id.length > 3 ?
          <div>
            <button onClick={()=>onJoin()}> { !selectActivity ? 'Join' : 'Not Join'} </button>
            {isLogged === false && <p>You are not logged in. </p>}
            {(place==='private') && <button onClick={()=> onRemove()}> x </button>}
            {(place==='private') && <button onClick={()=> setEdit(!edit)}> {edit? 'turn back':'edit'}</button>}
          </div>
          : ''
        }

        {!edit ? (!selectActivity ? info : select) :
          <div>
            <h3>Edit</h3>
            <Form
              data = {note}
              onSubmitForm={(e) => updateNote(e)}
            />
          </div>
        }
      </div>
      )
  }

 Note.defaultProps = {
    place: ''
 }

  export {Note as default}



