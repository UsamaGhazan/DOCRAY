import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk(
  'upload Image',
  async ({ formData }, thunkAPI) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/image/upload', formData, config);
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

const uploadImageSlice = createSlice({
  name: 'upload Image',
  initialState,
  extraReducers: {
    [uploadImage.pending]: state => {
      return {
        loading: true,
      };
    },
    [uploadImage.fulfilled]: (state, action) => {
      return {
        loading: false,
        response: action.payload,
      };
    },
    [uploadImage.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default uploadImageSlice.reducer;
