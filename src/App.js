import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { Route, Routes, useNavigate } from "react-router-dom";
import Preferences from './components/Preferences';
import { ThemeProvider } from '@mui/material';
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

document.title = "Headlines - News on the go."
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
        onValue(ref(database, `users/${user.uid}`), (snapshot) => {
          if(snapshot.exists()) {
            if(snapshot.val().hasOwnProperty("userPref")) {
              setUserPref(snapshot.val().userPref);
            } else {
              navigate('/preferences');
            }
          } else {
            storeUser(user);
          }
        })
      } else {
        console.log("Logged out");
      }
    });
  }, []);
  
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({user});
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
      alert("You signed out.");
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
      navigate('/preferences'); 
    }).catch((err) => {
      console.log(err);
      alert(`An error occurred: ${err.errorCode}\n${err.errorMessage}`);
    })
  }
  
  const storeUserPref = () => {
    let currentUserId = user.uid;
    update(ref(database, '/users/' + currentUserId + '/userPref'), userPref).then(() => {
      navigate('/feed');
    }).catch((err) => {
      console.log(err);
      alert(`An error occurred while capturing your preferences: ${err.errorCode}\n${err.errorMessage}`);
    }); // add promise: then => redirect to feed
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar user={user} loginFunc={login} logoutFunc={logout} />
      <Routes>
        <Route exact path="/" element={<Home signUpFunc={login} />} />
        <Route path="/preferences" element={<Preferences categories={categories} handleChipClick={handleChipClick} userPref={userPref} storeUserPref={storeUserPref} />} />
        <Route path="/feed" element={<Feed categories={userPref} />} />
      </Routes>
    </ThemeProvider>
  );

}

export default App;
