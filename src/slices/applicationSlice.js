import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching applications
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async () => {
    const response = await axios.get('http://localhost:4000/api/v1/admin/getallapplication'); // Replace with your API endpoint
    return response.data.applications;
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default applicationSlice.reducer;
