import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAxrERI0LHDZVwDyw4zqvjAzHm91Xvwh5k",
  authDomain: "vidguesser.firebaseapp.com",
  databaseURL: "https://vidguesser.firebaseio.com",
  projectId: "vidguesser",
  storageBucket: "vidguesser.appspot.com",
  messagingSenderId: "264994617415"
};
firebase.initializeApp(config);

export default firebase;