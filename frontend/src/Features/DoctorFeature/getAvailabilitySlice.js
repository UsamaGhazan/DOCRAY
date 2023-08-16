import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAvailability = createAsyncThunk(
  'getAvailability',
  async (_, thunkAPI) => {
    try {
      console.log('getAvailbilty running');
      const {
        doctorLogin: { doctorInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      };
      const { data } = await axios(`/api/doctors/getAvailableSlots`, config);
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

export const getAvailabilitySlice = createSlice({
  name: 'getAvailability',
  initialState,

  extraReducers: {
    [getAvailability.pending]: () => {
      return {
        loading: true,
      };
    },

    [getAvailability.fulfilled]: (state, action) => {
      return {
        loading: false,
        availableSlots: action.payload,
      };
    },

    [getAvailability.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default getAvailabilitySlice.reducer;
