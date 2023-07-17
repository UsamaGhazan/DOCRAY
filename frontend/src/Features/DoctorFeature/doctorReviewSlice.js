import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const createDoctorReview = createAsyncThunk(
  'reviewDoctor',
  async ({ doctorId, review }, thunkAPI) => {
    console.log(doctorId, review);
    try {
      const {
        patientLogin: { patientInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${patientInfo.token}`,
        },
      };
      await axios.post(`/api/doctors/${doctorId}/reviews`, review, config);
    } catch (error) {
      console.log('In error part of review slice');
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const doctorReviewSlice = createSlice({
  name: 'doctorReview',
  initialState,
  reducers: {
    DOCTOR_REVIEW_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    [createDoctorReview.pending]: state => {
      return {
        loading: true,
      };
    },

    [createDoctorReview.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [createDoctorReview.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { DOCTOR_REVIEW_RESET } = doctorReviewSlice.actions;
export default doctorReviewSlice.reducer;
