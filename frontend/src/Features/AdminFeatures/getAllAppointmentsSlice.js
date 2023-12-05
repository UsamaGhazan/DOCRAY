import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  appointments: [],
  error: '',
};

export const getAppointmentsList = createAsyncThunk(
  'getAppointmentsList',
  async () => {
    try {
      const { data } = await axios.get(`/api/admin/appointments`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const appointmentsListSlice = createSlice({
  name: 'AppointmentsList',
  initialState,
  extraReducers: {
    [getAppointmentsList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getAppointmentsList.fulfilled]: (state, action) => {
      return {
        loading: false,
        appointments: action.payload,
      };
    },
    [getAppointmentsList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default appointmentsListSlice.reducer;
