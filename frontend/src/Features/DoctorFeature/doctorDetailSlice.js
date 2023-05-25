import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: true,
  doctorDetails: [],
};

export const getDoctorDetails = createAsyncThunk(
  'doctorDetails',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios(`/api/doctors/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const doctorDetailSlice = createSlice({
  name: 'Order Details',
  initialState,
  extraReducers: {
    [getDoctorDetails.pending]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [getDoctorDetails.fulfilled]: (state, action) => {
      return {
        loading: false,
        doctor: action.payload,
      };
    },
    [getDoctorDetails.error]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default doctorDetailSlice.reducer;
