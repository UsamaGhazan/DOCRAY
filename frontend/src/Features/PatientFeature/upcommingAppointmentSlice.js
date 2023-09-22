import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUpcommingAppointments = createAsyncThunk(
  'Upcomming Appointment',
  async (patientId, thunkAPI) => {
    console.log(patientId);
    try {
      const { data } = await axios.get(
        `/api/patients/getUpcommingAppointments/${patientId}`
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
};

const upcommingAppointmentSlice = createSlice({
  name: 'Upcomming Appointment',

  initialState,
  reducers: {
    UPCOMMING_APPOINTMENT_RESET: (state, action) => {
      state.appointments = state.appointments.filter(
        appointment => appointment._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getUpcommingAppointments.pending]: state => {
      return {
        loading: true,
      };
    },
    [getUpcommingAppointments.fulfilled]: (state, action) => {
      return {
        loading: false,
        appointments: action.payload,
      };
    },
    [getUpcommingAppointments.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { UPCOMMING_APPOINTMENT_RESET } = upcommingAppointmentSlice;
export default upcommingAppointmentSlice.reducer;
