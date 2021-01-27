import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBrBYPRlupClbpLB-Mkt_QTnjVozntLOpc",
    authDomain: "water-my-plants-6423c.firebaseapp.com",
    projectId: "water-my-plants-6423c",
    storageBucket: "water-my-plants-6423c.appspot.com",
    messagingSenderId: "780392730631",
    appId: "1:780392730631:web:73f7aa80f32e7829759aa2"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage};