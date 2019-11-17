const firebase = require('firebase/app')
require('firebase/firestore')

const firebaseConfig = {
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
