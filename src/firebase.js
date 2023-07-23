
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1_I-8xq8ftfiZVnWtmzFeWyNTknC9bMs",
  authDomain: "pokego-148cf.firebaseapp.com",
  databaseURL: "https://pokego-148cf-default-rtdb.firebaseio.com",
  projectId: "pokego-148cf",
  storageBucket: "pokego-148cf.appspot.com",
  messagingSenderId: "589986593167",
  appId: "1:589986593167:web:85d73f7ad47863e1bdf3fa",
  measurementId: "G-52GMRXDDKZ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

var database = firebase.database();
 
export default database;