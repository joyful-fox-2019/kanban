import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  // apiKey:'AIzaSyCoL1WxThwaPIVsLVnhFJcRbSabI-hJBZE',
  // authDomain:'kanban-63ff3.firebaseapp.com',
  // projectId:'kanban-63ff3',
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
});

export default firebase.firestore();
