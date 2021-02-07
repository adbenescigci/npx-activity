import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_API_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };


firebase.initializeApp(config);

const database= firebase.database();
const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export {firebase , googleAuthProvider, database as default}

// //child remove
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// //child change
// database.ref('expenses').on('child_changed', (snapshot)=>{
//     console.log(snapshot.key, snapshot.val())
// } )

// // database.ref('expenses')
// //   .once('value')
// //   .then((snapshot)=>{
// //       const expenses = [];
      
// //       snapshot.forEach((childSnapshot)=>{
// //         expenses.push({
// //             id: childSnapshot.key,
// //             ...childSnapshot.val()
// //         })
// //       })
// //       console.log(expenses)
// //   })

// // database.ref('expenses')
// //   .on('value', (snapshot)=>{
// //       const expenses = [];
      
// //       snapshot.forEach((childSnapshot)=>{
// //         expenses.push({
// //             id: childSnapshot.key,
// //             ...childSnapshot.val()
// //         })
// //       })
// //       console.log(expenses)
// //   })


// // database.ref('expenses').push( {
// //     description:'Gum',
// //     note:'',
// //     amount: 195 ,
// //     createdAt: 0
// // })


// // database.ref().on('value', (snapshot) =>{
// //     const val =snapshot.val()
// //     console.log(`${val.name} is a ${val.job.title} in ${val.job.company}`)
// // }
// // )

// // const onValueChange = database.ref().on('value', (snapshot)=>{
// //     console.log(snapshot.val())
// // }, (e) =>{
// //     console.log('Error with data fetching', e)
// // })



// // database.ref('location/city')
// //     .once('value')
// //     .then((snapshot)=>{
// //         const val = snapshot.val();
// //         console.log(val)
// //     }).catch((e)=>{
// //         console.log('fetch error', e)
// //     })

// // database.ref().set({
// //     name: 'abd',
// //     age:24,
// //     isSingle:false,
// //     stressLevel: 6,
// //     job:{
// //        title: 'Software developer',
// //        company: 'Google'
// //     },
// //     location: {
// //         city:'ankara',
// //         country: 'TR'
// //     }
// // }).then(()=>{
// //     console.log('Data is saved')
// // }).catch((e)=>{
// //     console.log('this failed ',e.message)
// // });


// // database.ref().update({
// //     stressLevel: 9,
// //     'job/company': 'Amazon',
// //     'location/city': 'Istanbul'

// // })
  
// //   database.ref('attributes').set({
// //       height:23,
// //       weight:56
// //     }).then(()=>{
// //         console.log('add succeded for second')
// //     }).catch((e)=>{
// //         console.log('remove failed for second',e.message)
// //     })

// // database.ref('isSingle')
// //     .remove()
// //     .then(()=>{
// //         console.log('remove succeded')
// //     }).catch((e)=>{
// //         console.log('something is wrong',e)
// //     })