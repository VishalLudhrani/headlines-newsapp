import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#222131',
      white: '#F6F4F4'
    },
    primary: {
      light: '#C6CBD9',
      main: '#8D99C4',
      dark: '#464064',
      contrastText: '#F6F4F4'
    },
    text: {
      primary: '#222131',
      secondary: '#58567B',
      disabled: '#34314B'
    },
    divider: 'rgba(34, 33, 39, 0.12)',
    background: {
      paper: '#FFFFFF',
      default: '#F6F4F4'
    }
  }
});

export default theme;