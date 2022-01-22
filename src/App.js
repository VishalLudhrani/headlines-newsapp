import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { Route, Routes, useNavigate } from "react-router-dom";
import Preferences from './components/Preferences';
import { Button, IconButton, Snackbar, ThemeProvider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Feed from './components/Feed/Feed';


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
const database = getDatabase();
const auth = getAuth();

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];

let boxMargin = "";
let headingVariant = "";


const App = () => {
  
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPref, setUserPref] = useState({
    "business": false,
    "entertainment": false,
    "general": false,
    "health": false,
    "science": false,
    "sports": false,
    "technology": false
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userResult) => {
      if(userResult) {
        setUser(userResult);
        onValue(ref(database, `users/${userResult.uid}`), (snapshot) => {
          if(snapshot.exists()) {
            if(snapshot.val().hasOwnProperty("userPref")) {
              setUserPref(snapshot.val().userPref);
              navigate('/feed');
            } else {
              navigate('/preferences');
            }
          } else {
            storeUser(userResult);
          }
        })
      } else {
        navigate('/');
      }
    });
    boxMargin = (window.innerWidth < 576) ? "3rem auto": "10rem auto";
    headingVariant = (window.innerWidth < 576) ? "h3" : "h2";
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        <a style={{color: '#8D99C4'}} href="https://github.com/VishalLudhrani/headlines-newsapp" target="_blank">
          View on GitHub
        </a>
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const resultUser = result.user;
        setUser(resultUser);
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
  
  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("Signed out successfully.");
    }).catch((error) => {
      // An error happened.
      alert(`An error occurred!\n${error.errorCode}: ${error.errorMessage}`);
    });
  }
  
  const handleChipClick = (category) => {
    let tempCategory = {...userPref};
    tempCategory[category] = !tempCategory[category];
    setUserPref(tempCategory);
  }
  
  const storeUser = (user) => {
    set(ref(database, '/users/' + user.uid), {
      name: user.displayName,
      email: user.email
    }).then(() => {
      // do good stuff
    }).catch((err) => {
      alert(`An error occurred: ${err.errorCode}\n${err.errorMessage}`);
    });
  }
  
  const storeUserPref = () => {
    let currentUserId = user.uid;
    if(currentUserId !== undefined) {
      update(ref(database, '/users/' + currentUserId + '/userPref'), userPref).then(() => {
        alert("Preferences saved!");
      }).catch((err) => {
        alert(`An error occurred while capturing your preferences: ${err.errorCode}\n${err.errorMessage}`);
      }); // add promise: then => redirect to feed
    } else {
      alert("Something went wrong.\nSorry for the terrible experience, kindly reload the webpage and try again.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar user={user} loginFunc={login} logoutFunc={logout} />
      <Routes>
        <Route exact path="/" element={<LandingPage signUpFunc={login} heroBoxMargin={boxMargin} headingVariant={headingVariant} />} />
        <Route path="/preferences" element={<Preferences categories={categories} handleChipClick={handleChipClick} userPref={userPref} storeUserPref={storeUserPref} />} />
        <Route path="/feed" element={<Feed categories={userPref} />} />
      </Routes>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="View this project on GitHub"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </ThemeProvider>
  );

}

export default App;
