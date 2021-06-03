
const SelectionButtons = ({option, query, index, note, onClickSelectItems})=>{
    console.log(query[index])
    return option[2][query[index]-1].map(item => {
  
            const indexSub = note.selected[index][2][query[index]-1].indexOf(item)
  
            return <button
                      disabled = {item.status!=='unRead' }
                      key={item.name}
                      onClick = {() => onClickSelectItems(item,indexSub)}
                    >
                      {item.name}
                    </button>
          })
  }

  export {SelectionButtons as default}