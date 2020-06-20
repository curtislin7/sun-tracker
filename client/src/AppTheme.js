import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#fffdd0'
      },
      secondary: green,
      gradient: 'linear-gradient(45deg, #5b5a69 30%, #7fffd4 90%)',
    },
    typography: {
        fontFamily: [
          'Times, serif',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
});
