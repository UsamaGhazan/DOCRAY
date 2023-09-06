import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const cancelAppointment = createAsyncThunk(
  'cancelAppointment',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `/api/doctors/cancelAppointment/${id}`
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
  loading: false,
};

const cancelAppointmentSlice = createSlice({
  name: 'cancelAppointment',
  initialState,

  extraReducers: {
    [cancelAppointment.pending]: () => {
      return { loading: true };
    },

    [cancelAppointment.fulfilled]: (state, action) => {
      return { loading: false, message: action.payload };
    },

    [cancelAppointment.rejected]: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export default cancelAppointmentSlice.reducer;
