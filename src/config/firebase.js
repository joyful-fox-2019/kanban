import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://testingkanban.firebaseio.com",
    projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
    storageBucket: "testingkanban.appspot.com",
    messagingSenderId: "780786268843",
    appId: "1:780786268843:web:e7ebf403a3aa6edfcb55ee"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db
