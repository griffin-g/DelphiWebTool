import { createTheme } from '@mui/material/styles';

// define default theme
const defaultTheme = createTheme({
  palette: {
    mode: 'light', 
    primary: {
      main: '#66bb6a', 
    },
    secondary: {
      main: '#ff4081', 
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

export default defaultTheme;