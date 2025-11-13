import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { fetchFormations, fetchLogs, fetchWells } from './store/reducers/lists.js';

import CssBaseline from '@mui/material/CssBaseline';
import ExamplePage from './earthnet/ExamplePage';
import Wellbore from './earthnet/Wellbore';
import Histogram from './earthnet/Histogram';

import theme from './theme';

const appTheme = createTheme(theme);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWells());
    dispatch(fetchLogs());
    dispatch(fetchFormations());
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ExamplePage />} />
          <Route path="/wellbore" element={<Wellbore />} />
          <Route path="/histogram" element={<Histogram />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
