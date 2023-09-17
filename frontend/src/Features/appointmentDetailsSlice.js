import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAppointmentDetail = createAsyncThunk(
  'appointment Detail',
  async ({ doctorId, patientId }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/doctors/getAppointmentDetail?doctorId=${doctorId}&patientId=${patientId}`
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

const appointmentDetailsSlice = createSlice({
  name: 'appointment Detail',
  initialState,

  extraReducers: {
    [getAppointmentDetail.pending]: state => {
      return {
        loading: true,
      };
    },
    [getAppointmentDetail.fulfilled]: (state, action) => {
      return {
        loading: false,
        appointments: action.payload,
      };
    },
    [getAppointmentDetail.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default appointmentDetailsSlice.reducer;
