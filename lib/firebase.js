import * as firebase from 'firebase'


const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}


const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }





// // child_removed
//
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })
//
// // child_changed
//
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })
//
// // child_added (fires for existing too)
//
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// const expensesArray = (snapshot) => {
//   const expenses = []
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })
//   console.log(expenses)
// }
//
// database.ref('expenses').on('value', (snapshot) => expensesArray(snapshot))




// database.ref('expenses').push({
//   description: 'Rent',
//   note: '',
//   amount: 109500,
//   createdAt: 12321312343
// })





// database.ref('notes/-L6cwX1qsRjftNgl6s7R').remove()

// database.ref('notes').push({
//   title: 'Another test',
//   body: 'another note'
// })

// const notes = [
//   {
//     id: '12',
//     title: 'First notes!',
//     body: 'This is my note.'
//   },
//   {
//     id: '761ase',
//     title: 'Second notes!',
//     body: 'This is my note too.'
//   }
// ]
//
// database.ref('notes').set(notes)



// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val()
//   console.log(`${val.name} is a ${val.job.title} at ${val.location.city}`)
// }, (e) => {
//   console.log(e.message)
// })

// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val())
// }, (e) => {
//   console.log('Error with data fetching', e)
// })
//
// setTimeout(() => {
//   database.ref('age').set(42)
// }, 3500)
//
// setTimeout(() => {
//   database.ref().off('value', onValueChange)
// }, 7000)
//
// setTimeout(() => {
//   database.ref('age').set(24)
// }, 10500)

// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val()
//     console.log(val)
//   }).catch((e) => {
//     console.log('Error getting data: ', e)
// })


// database.ref().set({
//   name: 'G',
//   age: 47,
//   stressLevel: 6,
//   job: {
//     title: 'Software Developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Phoenix',
//     country: 'United States'
//   }
// }).then(() => {
//   console.log('Data is saved!')
// }).catch((e) => {
//   console.log('This failed:', e)
// })
//
// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// })

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Data deleted')
//   }).catch((e) => {
//   console.log('This failed:', e)
// })