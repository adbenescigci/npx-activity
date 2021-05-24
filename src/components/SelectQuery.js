
const SelectQuery = ({option, onChangeQuery})=> {

    return  <select
              name='query'
              onChange={(e)=> onChangeQuery(e.target.value) }
            >
              {option[2].map( item => (
                <option 
                    key={option[2].indexOf(item)} 
                    value = {option[2].indexOf(item)+1}
                > 
                    {option[2].indexOf(item)+1} 
                </option>
              ))
              }
            </select>
  }

  export {SelectQuery as default}