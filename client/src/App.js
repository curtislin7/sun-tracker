import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import SunsetFlow from './Pages/SunsetFlow.jsx'
import { theme } from './AppTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={SunsetFlow}/>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
