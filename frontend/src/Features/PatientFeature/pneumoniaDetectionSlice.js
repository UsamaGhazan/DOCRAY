import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const detectPneumonia = createAsyncThunk(
  'pneumoniaDetection',
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post(
        'http://localhost:8000/predict',
        formData,
        config
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

const initialState = {};

const pneumoniaDetectionSlice = createSlice({
  name: 'detectPneumonia',
  initialState,

  extraReducers: {
    [detectPneumonia.pending]: () => {
      return {
        loading: true,
      };
    },
    [detectPneumonia.fulfilled]: (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    },
    [detectPneumonia.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default pneumoniaDetectionSlice.reducer;
