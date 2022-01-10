import './App.css';
import { createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

document.title = "Headlines - News on the go."

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  }
});

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
