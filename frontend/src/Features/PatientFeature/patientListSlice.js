import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  patients: [],
  error: '',
};

export const getPatientList = createAsyncThunk('getPatientList', async () => {
  try {
    const { data } = await axios.get(`/api/patients`);
    return data;
  } catch (error) {
    return error;
  }
});

export const patientListSlice = createSlice({
  name: 'PatientList',
  initialState,
  extraReducers: {
    [getPatientList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getPatientList.fulfilled]: (state, action) => {
      return {
        loading: false,
        patients: action.payload,
      };
    },
    [getPatientList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default patientListSlice.reducer;
