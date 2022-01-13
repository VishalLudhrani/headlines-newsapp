import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

document.title = "Headlines - News on the go."
const auth = getAuth();

class App extends React.Component {
  
  state = {
    user: null
  }
  
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.setState({user: user});
      } else {
        console.log("Logged out.");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Navbar user={this.state.user} loginFunc={this.login} logoutFunc={this.logout} />
          <Hero />
        </ThemeProvider>
      </div>
    );
  }

  login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.setState({user: user});
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error ${errorCode}\n${errorMessage}`);
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("You signed out.");
    }).catch((error) => {
      // An error happened.
      alert(`An error occurred!\n${error.errorCode}: ${error.errorMessage}`);
    });
  }

}

export default App;
