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

export const fetchWells = createAsyncThunk('lists/fetchWells', async (_, { rejectWithValue }) =>
  fetchJson(`${baseURL}/wells`, rejectWithValue, 'Unable to fetch wells')
);

export const fetchLogs = createAsyncThunk('lists/fetchLogs', async (_, { rejectWithValue }) =>
  fetchJson(`${baseURL}/logs`, rejectWithValue, 'Unable to fetch logs')
);

export const fetchFormations = createAsyncThunk(
  'lists/fetchFormations',
  async (_, { rejectWithValue }) =>
    fetchJson(`${baseURL}/formations`, rejectWithValue, 'Unable to fetch formations')
);

const union = arrays => {
  if (!arrays.length) {
    return [];
  }

  const allValues = arrays.flat();
  return [...new Set(allValues)];
};

const getAllowedIds = (selectedWellsEntities, key) => {
  if (!selectedWellsEntities.length) {
    return null;
  }

  const collections = selectedWellsEntities.map(item => item[key] ?? []);
  return union(collections);
};

const toLookup = (items, key) =>
  items.reduce((acc, item) => {
    acc[item[key]] = item.id;
    return acc;
  }, {});

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    wells: [],
    logs: [],
    formations: [],
    selectedWells: [],
    selectedLogs: [],
    selectedFormations: [],
    status: {
      wells: 'idle',
      logs: 'idle',
      formations: 'idle'
    },
    error: {
      wells: null,
      logs: null,
      formations: null
    }
  },
  reducers: {
    selectWells: (state, action) => {
      state.selectedWells = action.payload;

      const selectedWellEntities = state.wells.filter(({ name }) => state.selectedWells.includes(name));

      const allowedLogIds = getAllowedIds(selectedWellEntities, 'logs');
      const allowedFormationIds = getAllowedIds(selectedWellEntities, 'formations');

      const logLookup = toLookup(state.logs, 'log');
      const formationLookup = toLookup(state.formations, 'name');

      if (allowedLogIds) {
        state.selectedLogs = state.selectedLogs.filter(
          logName => allowedLogIds.includes(logLookup[logName])
        );
      }

      if (allowedFormationIds) {
        state.selectedFormations = state.selectedFormations.filter(
          formationName => allowedFormationIds.includes(formationLookup[formationName])
        );
      }
    },
    selectLogs: (state, action) => {
      const selectedWellEntities = state.wells.filter(({ name }) => state.selectedWells.includes(name));
      const allowedLogIds = getAllowedIds(selectedWellEntities, 'logs');
      const logLookup = toLookup(state.logs, 'log');

      if (allowedLogIds) {
        state.selectedLogs = action.payload.filter(logName => allowedLogIds.includes(logLookup[logName]));
      } else {
        state.selectedLogs = action.payload;
      }
    },
    selectFormations: (state, action) => {
      const selectedWellEntities = state.wells.filter(({ name }) => state.selectedWells.includes(name));
      const allowedFormationIds = getAllowedIds(selectedWellEntities, 'formations');
      const formationLookup = toLookup(state.formations, 'name');

      if (allowedFormationIds) {
        state.selectedFormations = action.payload.filter(formationName =>
          allowedFormationIds.includes(formationLookup[formationName])
        );
      } else {
        state.selectedFormations = action.payload;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWells.pending, state => {
        state.status.wells = 'loading';
        state.error.wells = null;
      })
      .addCase(fetchWells.fulfilled, (state, action) => {
        state.status.wells = 'succeeded';
        state.wells = action.payload;
      })
      .addCase(fetchWells.rejected, (state, action) => {
        state.status.wells = 'failed';
        state.error.wells = action.payload || action.error.message;
      })
      .addCase(fetchLogs.pending, state => {
        state.status.logs = 'loading';
        state.error.logs = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status.logs = 'succeeded';
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status.logs = 'failed';
        state.error.logs = action.payload || action.error.message;
      })
      .addCase(fetchFormations.pending, state => {
        state.status.formations = 'loading';
        state.error.formations = null;
      })
      .addCase(fetchFormations.fulfilled, (state, action) => {
        state.status.formations = 'succeeded';
        state.formations = action.payload;
      })
      .addCase(fetchFormations.rejected, (state, action) => {
        state.status.formations = 'failed';
        state.error.formations = action.payload || action.error.message;
      });
  }
});

export const {
  selectWells,
  selectLogs,
  selectFormations
} = listsSlice.actions;

export default listsSlice.reducer;
