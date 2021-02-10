

  // function remove () {
  //   return database.ref('test').remove()
  // }
  
  // function set () {
  //   return database.ref('test').set({
  //     name: 'Jack',
  //     age: 12
  //   })
  // }
  
  // async function asyncRemove() {
    
  //   console.log('calling remove');
  //   const result = await remove();
  //   console.log(result,'cleaned')
  // }
  
  // async function asyncSet(){
  //   console.log('calling set');
  //   const result = await set();
  //   console.log(result,set)
  
  // }
  
  // asyncRemove();
  // asyncSet();


  
// //Async function with Promise.all
// const startNormal = () => {
//   console.log('start with promise all ')

//   return Promise.all([commonNotes(),initialNotes()]).then((mes)=>{
    
//     const notes= [];
    
//     mes[0].forEach((child)=>{
//         notes.push(child.val())
//       })

//     mes[1].forEach((child)=>{
//         notes.push(child.val())
//       })
      
//     if(notes) {
//       dispatch({type: 'POPULATE_NOTES', notes})
//     }
//   })
// }