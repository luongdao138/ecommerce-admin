import { createMuiTheme } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});
