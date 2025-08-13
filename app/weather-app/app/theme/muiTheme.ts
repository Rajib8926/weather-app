import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#62bdff',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff88',
    },
    text: {
      primary: '#252525',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
  },
  spacing: 8,
});

export default muiTheme;