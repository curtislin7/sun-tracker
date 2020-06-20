import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#fd8953'
      },
      secondary: green,
      gradient: 'linear-gradient(45deg, #5b5a69 30%, #7fffd4 90%)',
    },
});
