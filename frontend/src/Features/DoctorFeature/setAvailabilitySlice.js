import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const setAvailability = createAsyncThunk(
  'setAvailability',
  async (selectedSlots, thunkAPI) => {
    try {
      const {
        doctorLogin: { doctorInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${doctorInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/doctors/setAvailableSlots`,
        selectedSlots,
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

const initialState = { message: { success: false } };

export const setAvailabilitySlice = createSlice({
  name: 'setAvailability',
  initialState,
  reducers: {},

  extraReducers: {
    [setAvailability.pending]: () => {
      return {
        loading: true,
      };
    },

    [setAvailability.fulfilled]: (state, action) => {
      return {
        loading: false,
        message: action.payload,
      };
    },

    [setAvailability.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default setAvailabilitySlice.reducer;
