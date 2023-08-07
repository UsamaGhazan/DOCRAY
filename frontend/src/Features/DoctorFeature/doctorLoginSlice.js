import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginDoc = createAsyncThunk(
  'loginDoctor',
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
        `/api/doctors/login`,
        { email, password },
        config
      );
      //Setting User data to local storage which we are getting from backend
      localStorage.setItem('doctorInfo', JSON.stringify(data));
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

export const doctorLoginSlice = createSlice({
  name: 'doctorLogin',
  initialState,
  reducers: {
    logoutDoc: (state, action) => {
      localStorage.removeItem('doctorInfo');
      return {};
    },
  },
  extraReducers: {
    [loginDoc.pending]: () => {
      return {
        loading: true,
      };
    },

    [loginDoc.fulfilled]: (state, action) => {
      return {
        loading: false,
        doctorInfo: action.payload,
      };
    },

    [loginDoc.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { logoutDoc } = doctorLoginSlice.actions;
export default doctorLoginSlice.reducer;
