var firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: process.env.VUE_APP_KEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  databaseURL: process.env.VUE_APP_URL,
  projectId: process.env.VUE_APP_ID,
  storageBucket: process.env.VUE_APP_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASSUREMENT_ID
  })

module.exports = firebase