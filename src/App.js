import './App.css';
import { createTheme } from '@mui/material';

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
      <h1>Project under development.</h1>
    </div>
  );
}

export default App;
