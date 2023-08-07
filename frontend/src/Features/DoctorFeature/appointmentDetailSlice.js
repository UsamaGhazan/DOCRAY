import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAppointments = createAsyncThunk(
  'appointment details',
  async (doctorId, thunkAPI) => {
    console.log(doctorId);
    try {
      const { data } = await axios('/api/doctors/getAppointments', {
        doctorId,
      });
      return data;
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const initialState = {
  laoding: true,
};

const appointmentDetailSlice = createSlice({
  name: 'appointment details',
  initialState,
  extraReducers: {
    [getAppointments.pending]: state => {
      return {
        loading: true,
      };
    },
    [getAppointments.fulfilled]: (state, action) => {
      return {
        loading: false,
        appointments: action.payload,
      };
    },
    [getAppointments.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default appointmentDetailSlice.reducer;
