import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBsNOzGigVINwr6uU2Uplzty8bhFIpkPTQ",
    authDomain: "what-have-i-learned.firebaseapp.com",
    databaseURL: "https://what-have-i-learned.firebaseio.com",
    projectId: "what-have-i-learned",
    storageBucket: "what-have-i-learned.appspot.com",
    messagingSenderId: "492498612955",
    appId: "1:492498612955:web:7b637ad6ca81985ecc52fe",
    measurementId: "G-15E84RD3KH"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  firebase.analytics();
  export default firebaseApp.firestore()