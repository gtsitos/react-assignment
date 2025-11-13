import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchWithRetry from '../../utils/fetchWithRetry';

const baseURL = 'http://localhost:8000';

const withHandledError = (error, fallbackMessage) => {
  if (!error) {
    return fallbackMessage;
  }
  if (error.message) {
    return error.message;
  }
  return fallbackMessage;
};

const fetchJson = async (url, rejectWithValue, errorMessage) => {
  try {
    // Disable automatic retries - user must manually retry via button
    const response = await fetchWithRetry(url, undefined, { retries: 0 });
    return await response.json();
  } catch (error) {
    return rejectWithValue(withHandledError(error, errorMessage));
  }
};

export const fetchAllPlots = createAsyncThunk('plots/fetchPlots', async (_, { rejectWithValue }) =>
  fetchJson(`${baseURL}/plots`, rejectWithValue, 'Unable to fetch plots')
);

export const fetchSelectedPlots = createAsyncThunk(
  'plots/fetchSelectedPlots',
  async (_, { getState, rejectWithValue }) => {
    const { wells, selectedWells } = getState().lists;
    const selected = wells.filter(({ name }) => selectedWells.includes(name));

    if (selected.length === 0) {
      return [];
    }

    const url = new URL(`${baseURL}/plots`);
    selected.forEach(({ id }) => url.searchParams.append('wellId', id));

    try {
      // Disable automatic retries - user must manually retry via button
      const response = await fetchWithRetry(url.toString(), undefined, { retries: 0 });
      return await response.json();
    } catch (error) {
      return rejectWithValue(withHandledError(error, 'Unable to fetch selected plots'));
    }
  }
);

export const plotsSlice = createSlice({
  name: 'plots',
  initialState: {
    data: [],
    barmode: 'stack',
    orientation: 'v',
    status: 'idle',
    error: null
  },
  reducers: {
    selectBarmode: (state, action) => {
      state.barmode = action.payload;
    },
    selectOrientation: (state, action) => {
      state.orientation = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPlots.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllPlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllPlots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchSelectedPlots.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSelectedPlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSelectedPlots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { selectBarmode, selectOrientation } = plotsSlice.actions;

export default plotsSlice.reducer;
