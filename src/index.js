import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDu4sPOsf7ikSSeY9wzYVg0L-VWmDCT0SA",
    authDomain: "moodproyecto.firebaseapp.com",
    databaseURL: "https://moodproyecto.firebaseio.com",
    projectId: "moodproyecto",
    storageBucket: "moodproyecto.appspot.com",
    messagingSenderId: "927506365659"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
