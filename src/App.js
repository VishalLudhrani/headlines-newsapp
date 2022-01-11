import React from 'react';
import './App.css';
import { createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

document.title = "Headlines - News on the go."

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Hero />
      </div>
    );
  }
}

export default App;
