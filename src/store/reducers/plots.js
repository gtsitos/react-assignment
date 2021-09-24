import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = 'http://localhost:8000';

export const fetchAllPlots = createAsyncThunk('fetchPlots', async () => {
  const response = await fetch(`${baseURL}/plots`);
  return response.json();
});

export const fetchSelectedPlots = createAsyncThunk(
  'fetchSelectedPlots',
  async (_, { getState }) => {
    const { wells, selectedWells } = getState().lists;
    const selected = wells.filter(({ name }) => selectedWells.includes(name));
    const url = new URL(`${baseURL}/plots`);
    selected.map(({ id }) => url.searchParams.append('wellId', id));
    const response = await fetch(url);
    return response.json();
  }
);

export const plotsSlice = createSlice({
  name: 'plots',
  initialState: {
    data: [],
    barMode: 'stack',
    orientation: 'vertical'
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
      .addCase(fetchSelectedPlots.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  }
});

export const { selectWellPlots, selectBarModes, selectOrientation } = plotsSlice.actions;

export default plotsSlice.reducer;
