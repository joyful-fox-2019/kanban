import firebase from "firebase";
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA5QSodCiXPyn09WTbT_1niE6PhqTL7WTM",
  authDomain: "kanban-app-3c641.firebaseapp.com",
  databaseURL: "https://kanban-app-3c641.firebaseio.com",
  projectId: "kanban-app-3c641",
  storageBucket: "kanban-app-3c641.appspot.com",
  messagingSenderId: "675142014523",
  appId: "1:675142014523:web:2a99f7f5c659bc148aae1e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
