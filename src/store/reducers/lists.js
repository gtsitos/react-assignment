import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:8000';

export const fetchWells = createAsyncThunk('fetchWells', async () => {
  const response = await fetch(`${baseURL}/wells`);
  return response.json();
});

export const fetchLogs = createAsyncThunk('fetchLogs', async () => {
  const response = await fetch(`${baseURL}/logs`);
  return response.json();
});

export const fetchFormations = createAsyncThunk('fetchFormations', async () => {
  const response = await fetch(`${baseURL}/formations`);
  return response.json();
});

export const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    wells: [],
    logs: [],
    formations: [],
    selectedWells: [],
    selectedLogs: [],
    selectedFormations: []
  },
  reducers: {
    selectWells: (state, action) => {
      state.selectedWells = action.payload;
    },
    selectLogs: (state, action) => {
      state.selectedLogs = action.payload;
    },
    selectFormations: (state, action) => {
      state.selectedFormations = action.payload;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchWells.fulfilled, (state, action) => {
      state.wells = action.payload;
    })
    .addCase(fetchLogs.fulfilled, (state, action) => {
      state.logs = action.payload;
    })
    .addCase(fetchFormations.fulfilled, (state, action) => {
      state.formations = action.payload;
    });
  }
});

export const {
  selectWells,
  selectLogs,
  selectFormations
} = listsSlice.actions;

export default listsSlice.reducer;
