//Database den veri cekme

//database.ref(`users/${this.state.uid}/vird`).once('value').then((snapshot)=>{
//   const vird=[];

//   snapshot.forEach((childv)=>{
//       const hedefSayi = childv.val().hedefSayi;
//       const id = childv.key;
//       vird.push([childv.val().text,hedefSayi, id])
//       }) 

//       this.setState(()=>({
//           personal:vird
//       }))

//   return vird
//   }).then((personal)=>{
//       if(this.state.ortakFlag){ 
//           this.setState(()=>({
//               vird:[...personal, ...this.state.ortak],
//               startUp: false,
//               ortakFlag:false,
//          })) 
//       }
//   })


// Database veri yukleme '<firebase>.set({})' ile

// useEffect(()=>{
//     if (notes.length > 0) {
//       database.ref('notes').set(notes)
//     }
// },[notes])