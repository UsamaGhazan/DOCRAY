import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      // specifying the content type of the request payload as JSON
      const config = {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `/api/patients/login`,
        { email, password },
        config
      );
      //Setting User data to local storage which we are getting from backend
      localStorage.setItem('patientInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      //This will end up in rejected section as payload... just error return karny sy fulfilled action run hora tha
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const initialState = {};

export const loginPatientSlice = createSlice({
  name: 'patientLogin',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('patientInfo');
      return {};
    },
  },
  extraReducers: {
    [login.pending]: () => {
      return {
        loading: true,
      };
    },

    [login.fulfilled]: (state, action) => {
      return {
        loading: false,
        patientInfo: action.payload,
      };
    },

    [login.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { logout } = loginPatientSlice.actions;
export default loginPatientSlice.reducer;
