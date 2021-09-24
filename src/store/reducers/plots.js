import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:8000';

export const fetchAllPlots = createAsyncThunk('fetchPlots', async () => {
  const response = await fetch(`${baseURL}/plots`);
  return response.json();
});

export const plotsSlice = createSlice({
  name: 'plots',
  initialState: {
    data: [],
    barMode: 'stack',
    orientation: 'vertical',
  },
  reducers: {
    selectBarModes: (state, action) => {
      state.barMode = action.payload;
    },
    selectOrientation: (state, action) => {
      state.orientation = action.payload;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(fetchAllPlots.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  }
});

export const {
  selectBarModes,
  selectOrientation
} = plotsSlice.actions;

export default plotsSlice.reducer;
