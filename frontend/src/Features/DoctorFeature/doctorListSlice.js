import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  doctors: [],
  error: '',
};

export const getDoctorList = createAsyncThunk('getDoctorList', async () => {
  try {
    console.log('Inside getDoctorList...');
    const { data } = await axios.get(`/api/doctors`);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
});

export const doctorListSlice = createSlice({
  name: 'DoctorList',
  initialState,
  extraReducers: {
    [getDoctorList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getDoctorList.fulfilled]: (state, action) => {
      return {
        loading: false,
        doctors: action.payload,
      };
    },
    [getDoctorList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default doctorListSlice.reducer;
