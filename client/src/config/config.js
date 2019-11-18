import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAvYMffr3mARQxOqaPF701uiXTws--t1ww',
  authDomain: 'kanban-8b53d.firebaseapp.com',
  databaseURL: 'https://kanban-8b53d.firebaseio.com',
  projectId: 'kanban-8b53d',
  storageBucket: 'kanban-8b53d.appspot.com',
  messagingSenderId: '4688655770',
  appId: '1:4688655770:web:769069f0a0e9a0df857623'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_API_KEY,
//   authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_DATABASE_URL,
//   projectId: process.env.VUE_APP_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_APP_ID
// }
