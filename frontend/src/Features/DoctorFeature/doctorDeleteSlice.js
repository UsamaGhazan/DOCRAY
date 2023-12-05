import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const deleteDoctor = createAsyncThunk(
  'doctorDelete',
  async (id, thunkAPI) => {
    console.log('handleDeleteSlice');

    try {
      const {
        adminLogin: { adminInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      await axios.delete(`/api/admin/${id}`, config);
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

const doctorDeleteSlice = createSlice({
  name: 'doctorDelete',
  initialState,
  extraReducers: {
    [deleteDoctor.pending]: state => {
      return {
        loading: true,
      };
    },

    [deleteDoctor.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [deleteDoctor.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default doctorDeleteSlice.reducer;
