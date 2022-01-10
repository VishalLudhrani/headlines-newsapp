import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8vXiNkdms5HGkUsS7g9gHMbQlawlGwbc",
  authDomain: "headlines-newsapp.firebaseapp.com",
  projectId: "headlines-newsapp",
  storageBucket: "headlines-newsapp.appspot.com",
  messagingSenderId: "782103017224",
  appId: "1:782103017224:web:9a450a788ce406106b9ebd",
  measurementId: "G-6W41W18LYT"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
