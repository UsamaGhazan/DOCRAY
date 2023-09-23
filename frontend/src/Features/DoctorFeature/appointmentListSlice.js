import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAppointments = createAsyncThunk(
  'appointment List',
  async (doctorId, thunkAPI) => {
    console.log(doctorId);
    try {
      const { data } = await axios.get(
        `/api/doctors/getAppointments/${doctorId}`
      );
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
  loading: true,
  appointments: [],
};

const appointmentListSlice = createSlice({
  name: 'appointment List',
  initialState,
  reducers: {
    APPOINTMENT_RESET: (state, action) => {
      state.appointments = state.appointments.filter(
        appointment => appointment._id !== action.payload
      );
    },
  },
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
export const { APPOINTMENT_RESET } = appointmentListSlice.actions;
export default appointmentListSlice.reducer;
