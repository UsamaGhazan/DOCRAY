import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const detectTb = createAsyncThunk(
  'TbDetection',
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post(
        'http://localhost:8000/tb_predict',
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

const TbDetectionSlice = createSlice({
  name: 'detectTb',
  initialState,

  extraReducers: {
    [detectTb.pending]: () => {
      return {
        loading: true,
      };
    },
    [detectTb.fulfilled]: (state, action) => {
      return {
        loading: false,
        data: action.payload,
      };
    },
    [detectTb.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default TbDetectionSlice.reducer;
