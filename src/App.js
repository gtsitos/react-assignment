import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { fetchFormations, fetchLogs, fetchWells } from './store/reducers/lists.js';

import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import ExamplePage from './earthnet/ExamplePage';
import Wellbore from './earthnet/Wellbore';
import Histogram from './earthnet/Histogram';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWells());
    dispatch(fetchLogs());
    dispatch(fetchFormations());
  }, []);

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={ExamplePage} />
        <Route path="/wellbore" exact component={Wellbore} />
        <Route path="/histogram" exact component={Histogram} />
      </Switch>
    </MuiThemeProvider>
  );
}
