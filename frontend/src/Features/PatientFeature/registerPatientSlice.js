import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login } from './loginPatientSlice';
export const register = createAsyncThunk(
  'registerPatient',
  async ({ name, email, password, gender, contact, dob }, thunkAPI) => {
    try {
      const config = {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `/api/patients`,
        { name, email, password, gender, contact, dob },
        config
      );
      //loggingin user as he is registered
      thunkAPI.dispatch(login({ email, password }));
      //Setting User data to local storage which we are getting from backend
      localStorage.setItem('patientInfo', JSON.stringify(data));
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

const initialState = {};

export const registerPatientSlice = createSlice({
  name: 'registerPatient',
  initialState,
  extraReducers: {
    [register.pending]: state => {
      return {
        loading: true,
      };
    },

    [register.fulfilled]: (state, action) => {
      return {
        loading: false,
        patientInfo: action.payload,
      };
    },

    [register.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default registerPatientSlice.reducer;
