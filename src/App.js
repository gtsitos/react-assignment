import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { wells, logs, formations, status } = useSelector(state => state.lists);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent duplicate fetches in StrictMode by using a ref
    if (hasInitialized.current) {
      return;
    }

    // Only fetch if data is not already loaded and not currently loading
    if (wells.length === 0 && status.wells !== 'loading' && status.wells !== 'succeeded') {
      dispatch(fetchWells());
    }
    if (logs.length === 0 && status.logs !== 'loading' && status.logs !== 'succeeded') {
      dispatch(fetchLogs());
    }
    if (formations.length === 0 && status.formations !== 'loading' && status.formations !== 'succeeded') {
      dispatch(fetchFormations());
    }

    hasInitialized.current = true;
  }, [dispatch, wells.length, logs.length, formations.length, status.wells, status.logs, status.formations]);

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
